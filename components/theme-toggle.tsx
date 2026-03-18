"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    
    React.useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted) {
        return null
    }
    
    return (
        <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 border border-amber-300/50 dark:border-amber-700/50 text-amber-800 dark:text-amber-200 hover:from-amber-200 hover:to-amber-300 dark:hover:from-amber-800/60 dark:hover:to-amber-700/60 hover:border-amber-400/60 dark:hover:border-amber-600/60 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
        >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    )
}