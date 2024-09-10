import { Button, Flex, Group, Loader, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";
import { updateCompany } from "../../utils/mutations";
import { fakeApi } from "../../utils/functions";
import { toast } from "sonner";
import { motion, Variants } from 'framer-motion'


const formItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
}


const addCompanySchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    countryName: z.string().min(1, { message: 'Country Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    phone: z.string().min(10, { message: 'Invalid phone number' }),
    postCode: z.string().min(1, 'Post code is required'),
})

export function AddCompanyForm({ close }: { close: () => void }) {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: '',
            city: '',
            countryName: '',
            description: '',
            phone: '',
            postCode: '',
            // "source": "test"
        },
        validate: zodResolver(addCompanySchema)
    })

    async function onSubmit(formData: z.infer<typeof addCompanySchema>) {
        try {
            setIsSubmiting(true)
            await updateCompany(formData)
            await fakeApi()
            toast.success('Company added')
            form.reset()
            close()
        } catch (error) {
            toast.error('Error adding company')
        } finally {
            setIsSubmiting(false)
        }

    }

    return <form onSubmit={form.onSubmit(onSubmit)}   >
        <Flex gap={8} p={20} direction={'column'} >
            <motion.div
                variants={formItemVariants}
            >
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

            </motion.div>
            <TextInput
                withAsterisk
                label="Description"
                placeholder="Description"
                key={form.key('description')}
                {...form.getInputProps('description')}
            />
            <motion.div
                className="flex gap-2"
                variants={formItemVariants}>
                <TextInput
                    withAsterisk
                    label="City"
                    placeholder="City"
                    key={form.key('city')}
                    {...form.getInputProps('city')}
                />
                <TextInput
                    withAsterisk
                    label="Country Name"
                    placeholder="Country Name"
                    key={form.key('countryName')}
                    {...form.getInputProps('countryName')}
                />
            </motion.div>
            <motion.div
                className="flex gap-2"
                variants={formItemVariants}>
                <TextInput
                    withAsterisk
                    type="number"
                    label="Phone"
                    placeholder="Phone"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}

                />
                <TextInput
                    withAsterisk
                    label="Post Code"
                    placeholder="Post Code"
                    key={form.key('postCode')}
                    {...form.getInputProps('postCode')}
                />
            </motion.div>
            <Group justify="flex-end" mt="md">
                <Button w={100} disabled={isSubmiting} variant="white" onClick={close} >
                    Close
                </Button>
                <Button type="submit" w={100} disabled={isSubmiting} >
                    {isSubmiting ? <Group gap={5} ><Loader size={20} />  Add </Group> : 'Add'}
                </Button>
            </Group>
        </Flex>
    </form>
}
