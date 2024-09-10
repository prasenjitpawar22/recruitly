'use client'
import { Center, } from '@mantine/core'
import { motion, useMotionValue, Variants } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AddCompanyForm } from './add-company.form'


const formVariants: Variants = {
    visible: { opacity: 1, width: 'auto', height: 'auto', transition: { type: 'spring', damping: 16, staggerChildren: 0.2 } },
    hidden: { opacity: 0, height: 0, },
}

export default function InlinePopup() {
    const [open, setOpen] = useState(false)
    const nameRef = useRef<HTMLInputElement>(null)

    let height = useMotionValue('auto')

    useEffect(() => {
        const nameId = setTimeout(() => {
            if (open) {
                nameRef.current?.focus()
            }
        }, 500)
        return () => clearTimeout(nameId)
    }, [open])

    return (
        <Center
            className={`flex items-center justify-center overflow-hidden flex-col pb-2`}
        >
            <motion.button
                onClick={() => setOpen(!open)}
                animate={{ y: open ? -5 : 0, transition: { duration: .4 } }}
                className={`transition-all duration-200 rounded-full px-4 py-2 m-2 text-sm font-[500] ${open ? 'text-white bg-blue-500' : 'bg-white border-blue-500 text-gray-800 border-2'} `}>
                {open ? <X size={20} /> : 'Add company'}
            </motion.button>
            <motion.div
                style={{ height }}
                variants={formVariants}
                initial={'hidden'}
                animate={open ? 'visible' : 'hidden'}
                transition={{ type: 'just' }}
                className='border shadow-md rounded-md'
            >
                <AddCompanyForm close={() => setOpen(false)} />
            </motion.div>
        </Center >
    )
}