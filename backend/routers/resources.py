from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from database import get_db
from models import user as models
from dependencies.oauth2 import get_current_user
from schemas.user import UserOut

router = APIRouter(
    prefix="/resources",
    tags=["Resources"]
)

class ResourceCreate(BaseModel):
    type: str
    name: str
    description: str
    quantity: int = 1
    location: str
    urgency_level: str = "medium"
    resource_type: str  # "needed" or "available"

class ResourceResponse(BaseModel):
    id: int
    type: str
    name: str
    description: str
    quantity: int
    location: str
    urgency_level: str
    resource_type: str
    contact_info: str
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True

# In-memory storage for demo (in production, create a proper Resource model)
resources_db = []
resource_id_counter = 1

@router.post("/", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
def create_resource(
    resource: ResourceCreate,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    global resource_id_counter

    # Create contact info from user data
    contact_info = f"{current_user.username} - {current_user.email}"
    if current_user.phone_number:
        contact_info += f" - {current_user.phone_number}"

    new_resource = {
        "id": resource_id_counter,
        "type": resource.type,
        "name": resource.name,
        "description": resource.description,
        "quantity": resource.quantity,
        "location": resource.location,
        "urgency_level": resource.urgency_level,
        "resource_type": resource.resource_type,
        "contact_info": contact_info,
        "created_at": datetime.utcnow(),
        "user_id": current_user.id
    }

    resources_db.append(new_resource)
    resource_id_counter += 1

    return new_resource

@router.get("/", response_model=List[ResourceResponse])
def get_resources(
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    return resources_db

@router.delete("/{resource_id}")
def delete_resource(
    resource_id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    global resources_db

    # Find the resource
    resource_index = None
    for i, resource in enumerate(resources_db):
        if resource["id"] == resource_id:
            resource_index = i
            break

    if resource_index is None:
        raise HTTPException(status_code=404, detail="Resource not found")

    # Check if user owns the resource
    if resources_db[resource_index]["user_id"] != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this resource")

    # Remove the resource
    deleted_resource = resources_db.pop(resource_index)
    return {"message": "Resource deleted successfully"}



