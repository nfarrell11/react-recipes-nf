"use client"

import { Button } from "@/components/ui/button"
import { logOut } from "../actions"
/**
 * @author adhanji8
 */
export function LogOutButton() {
  return (
    <Button variant="destructive" onClick={async () => await logOut()}>
      Log Out
    </Button>
  )
}
