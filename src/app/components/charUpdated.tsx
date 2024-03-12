"use client"

import { Button } from "@/app/components/ui/button"
import { useToast } from "@/app/components/ui/use-toast"

export function CharUpdated() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
