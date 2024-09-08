import { Card, Text, Group, TextInput, Button, Stack } from '@mantine/core'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { fakeApi } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'password is required' })
})

export function LoginForm() {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const navigate = useNavigate();

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(loginSchema)
    })


    async function onSubmit(data: z.infer<typeof loginSchema>) {
        setIsSubmiting(true)
        console.log(data);

        await fakeApi();
        localStorage.setItem('logged-in', JSON.stringify(true))

        setIsSubmiting(false)
        navigate('/')
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
                <Text fz={'h3'} fw={500}>Login</Text>
            </Group>

            <Card.Section p={'lg'} w={400}>
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack align='stretch' justify='space-between' >
                        <TextInput
                            withAsterisk
                            label="Email"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            withAsterisk
                            label="Password"
                            type='password'
                            placeholder="**********"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                    </Stack>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" disabled={isSubmiting} >Login</Button>
                    </Group>
                </form>
            </Card.Section>
        </Card>
    )
}