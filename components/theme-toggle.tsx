"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"
import { Moon, Sun, Monitor, Palette } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
        title="Alterar tema"
        aria-label="Alterar tema"
      >
        <Palette className="h-5 w-5 text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                setTheme("light")
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer ${
                theme === "light" ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>Tema Claro</span>
            </button>

            <button
              onClick={() => {
                setTheme("dark")
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer ${
                theme === "dark" ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>Tema Escuro</span>
            </button>

            <button
              onClick={() => {
                setTheme("device")
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer ${
                theme === "device" ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span>Tema do Dispositivo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
