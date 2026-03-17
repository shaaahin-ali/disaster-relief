"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, ArrowRight, RefreshCw, Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"

function VerifyEmailContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    useEffect(() => {
        if (!email) {
            router.push("/")
        }
    }, [email, router])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        try {
            const response = await fetch(`${API_BASE_URL}/verify-otp?email=${encodeURIComponent(email!)}&otp=${otp}`, {
                method: "POST",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || "Verification failed")
            }

            setSuccess("Email verified successfully! Redirecting to home...")
            setTimeout(() => {
                router.push("/")
            }, 2000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        setError("")
        setSuccess("")
        setResending(true)

        try {
            const response = await fetch(`${API_BASE_URL}/resend-otp?email=${encodeURIComponent(email!)}`, {
                method: "POST",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.detail || "Failed to resend OTP")
            }

            setSuccess("A new OTP has been sent to your email.")
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg-base relative overflow-hidden flex flex-col">
            {/* Ambient glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-teal/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-amber/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 translate-y-1/2" />

            <Navigation />

            <div className="flex-1 flex items-center justify-center pt-24 px-6 pb-12 relative z-10">
                <Card className="w-full max-w-md glass-card border-accent-teal/20 shadow-glow-teal/10 relative overflow-hidden">
                    {/* Cyberpunk accent lines */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-teal to-transparent opacity-50"></div>

                    <CardHeader className="text-center space-y-4 pt-8">
                        <div className="mx-auto w-16 h-16 bg-glass-02 border border-accent-teal/30 shadow-[0_0_15px_rgba(45,212,191,0.2)] rounded-full flex items-center justify-center mb-2 relative">
                            <div className="absolute inset-0 rounded-full border border-accent-teal border-dashed animate-[spin_10s_linear_infinite] opacity-30"></div>
                            <ShieldCheck className="w-8 h-8 text-accent-teal relative z-10" />
                        </div>

                        <CardTitle className="text-3xl font-display font-black text-text-primary tracking-wide">
                            IDENTITY PROTOCOL
                        </CardTitle>

                        <CardDescription className="text-text-secondary font-body">
                            Authentication sequence initiated. Dispatching 6-digit confirmation cipher to <span className="font-mono text-accent-teal border-b border-accent-teal/30 pb-0.5">{email}</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8 p-8 pt-4">
                        {error && (
                            <div className="p-4 rounded-lg bg-accent-red/10 border border-accent-red/30 text-sm text-accent-red font-mono flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 rounded-lg bg-accent-teal/10 border border-accent-teal/30 text-sm text-accent-teal font-mono flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="otp" className="text-text-muted font-mono uppercase tracking-widest text-xs flex justify-center">
                                    Enter Secure Cipher
                                </Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    className="text-center text-3xl tracking-[0.5em] font-mono font-bold h-16 bg-bg-void border-glass-border-strong text-accent-teal focus-visible:ring-accent-teal focus-visible:border-accent-teal rounded-lg placeholder:text-text-muted/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-all"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-accent-teal text-bg-void hover:bg-accent-teal/90 py-6 rounded-lg font-display font-black tracking-widest uppercase transition-all flex items-center justify-center shadow-glow-teal disabled:opacity-50 disabled:shadow-none"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        AUTHENTICATING...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-lg">
                                        VERIFY CLEARANCE
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="text-center pt-2">
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="text-xs font-mono tracking-widest uppercase text-text-muted hover:text-accent-teal flex items-center justify-center mx-auto gap-2 transition-colors disabled:opacity-50"
                            >
                                {resending ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <RefreshCw className="w-3.5 h-3.5" />
                                )}
                                RESEND CIPHER VIA COMM LINK
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-base flex flex-col items-center justify-center text-accent-teal font-mono tracking-widest gap-4"><Loader2 className="w-8 h-8 animate-spin" /><span>LOADING PROTOCOL...</span></div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}
