import { Button, Flex, Group, Loader, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { z } from "zod";
import { updateCompany } from "../../utils/mutations";
import { fakeApi } from "../../utils/functions";
import { toast } from "sonner";


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
        <Flex gap={8} direction={'column'} >
            <TextInput
                withAsterisk
                label="Name"
                placeholder="Name"
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <TextInput
                withAsterisk
                label="Description"
                placeholder="Description"
                key={form.key('description')}
                {...form.getInputProps('description')}
            />
            <TextInput
                withAsterisk
                label="City"
                placeholder="City"
                key={form.key('city')}
                {...form.getInputProps('city')}
            /><TextInput
                withAsterisk
                label="Country Name"
                placeholder="Country Name"
                key={form.key('countryName')}
                {...form.getInputProps('countryName')}
            /><TextInput
                withAsterisk
                type="number"
                label="Phone"
                placeholder="Phone"
                key={form.key('phone')}
                {...form.getInputProps('phone')}
            /><TextInput
                withAsterisk
                label="Post Code"
                placeholder="Post Code"
                key={form.key('postCode')}
                {...form.getInputProps('postCode')}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit" w={100} disabled={isSubmiting} >
                    {isSubmiting ? <Group gap={5} ><Loader size={20} />  Add </Group> : 'Add'}
                </Button>
            </Group>
        </Flex>
    </form>
}
