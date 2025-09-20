"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileX, Home, Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmployerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileX className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Page not found</CardTitle>
          <CardDescription>
            The employer page you&apos;re looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Error 404
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/employer">
                <Briefcase className="mr-2 h-4 w-4" />
                Employer dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/employer/job-listings">
                <Briefcase className="mr-2 h-4 w-4" />
                Job listings
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
