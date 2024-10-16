import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, User } from "lucide-react"


interface UserDetailsProps {
    name: string | undefined
    email: string | undefined
    onSignOut: () => void
}

export default function UserCard({ name, email, onSignOut }: UserDetailsProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h1> Hi </h1>
                    <CardTitle className="text-xl">{email}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="text-sm">Signed In</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="destructive" className="w-full" onClick={onSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Button>
            </CardFooter>
        </Card>
    )
}