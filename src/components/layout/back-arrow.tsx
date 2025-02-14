"use client"
import { ChevronLeftIcon } from "lucide-react";

export function BackArrow() {
    return (
        <div className="md:hidden fixed top-4 left-4 z-50">
            <button onClick={() => window.history.back()} aria-label="Go back">
                <ChevronLeftIcon className="w-10 h-10 text-white bg-[#FFC006]/10 rounded-full p-2 " />
            </button>
        </div>
    )
}