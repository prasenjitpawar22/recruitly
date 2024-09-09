import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import classes from '../styles/card.module.css'
import { getCompany } from "../utils/queries";
import { Company as TCompamy } from "../types";
import { Button, Card, Center, Flex, Group, Loader, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useState } from "react";
import { CircleChevronLeft, Eye, Pencil } from "lucide-react";
import { updateCompany } from "../utils/mutations";
import { fakeApi } from "../utils/functions";
import { toast } from "sonner";

export async function loader(args: LoaderFunctionArgs<any>) {
    const company = await getCompany(args.params.id!)
    return company.data as TCompamy
}

const editCompanySchema = z.object({
    name: z.string(),
    city: z.string(),
    countryName: z.string().min(1, { message: 'Country Name is required' }),
    description: z.string(),
    phone: z.string(),
    postCode: z.string(),
    id: z.string()
})

export function Company() {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const company = useLoaderData() as TCompamy
    const [isViewMode, setIsViewMode] = useState(true)
    const navigate = useNavigate()
    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: company.name ?? '',
            city: company.headOffice.address.cityName ?? '',
            countryName: company.headOffice.address.countryName ?? '',
            description: company.description ?? '',
            phone: company.phone ?? '',
            postCode: company.headOffice.address.postCode ?? '',
            id: company.id
            // "source": "test"
        },
        validate: zodResolver(editCompanySchema)
    })


    async function onSubmit(data: z.infer<typeof editCompanySchema>) {
        try {
            setIsSubmiting(true)
            await updateCompany(data)
            await fakeApi()
            toast.success('Company updated')
            setIsViewMode(true)
        } catch (error) {
            toast.error('Opps, something went wrong.')
        } finally {
            setIsSubmiting(false)
        }
    }

    return (
        <Center h={'100vh'}>
            <Flex direction={'column'} justify={'center'} align={'center'} >
                <Group w={'100%'} mb={5}>
                    <CircleChevronLeft cursor={'pointer'} onClick={() => navigate(-1)} />
                </Group>
                <Card padding={'lg'} className={classes.card} withBorder shadow="sm" radius={'md'} >
                    <form onSubmit={form.onSubmit(onSubmit)} >
                        <Stack gap={"lg"} >
                            <Group gap={2} justify="stretch" grow>
                                <Text >Name </Text>
                                <TextInput key={form.key('name')} {...form.getInputProps('name')} disabled={isViewMode} />
                            </Group>
                            <Group gap={2} justify="stretch" grow>
                                <Text>Description </Text>
                                <TextInput key={form.key('description')} {...form.getInputProps('description')} disabled={isViewMode} />
                            </Group>
                            <Group gap={2} justify="stretch" grow>
                                <Text>City </Text>
                                <TextInput key={form.key('city')} {...form.getInputProps('city')} disabled={isViewMode} />
                            </Group>
                            <Group gap={2} justify="stretch" grow>
                                <Text>Phone </Text>
                                <TextInput key={form.key('phone')} {...form.getInputProps('phone')} disabled={isViewMode} />
                            </Group>
                            <Group gap={2} justify="stretch" grow>
                                <Text>Post code </Text>
                                <TextInput key={form.key('postCode')} {...form.getInputProps('postCode')} disabled={isViewMode} />
                            </Group>
                            <Group gap={2} justify="stretch" grow>
                                <Text>Country Name </Text>
                                <TextInput key={form.key('countryName')} {...form.getInputProps('countryName')} disabled={isViewMode} />
                            </Group>
                            {!isViewMode ?
                                <Group justify="flex-end" mt="md">
                                    <Button type="submit" disabled={isSubmiting}>
                                        {isSubmiting ? <Group gap={5} ><Loader size={20} />  Update </Group> : 'Update'}
                                    </Button>
                                </Group>
                                : null}
                        </Stack>
                    </form>
                </Card>
                <Group mt={12} align="center" justify="center" >
                    <Tooltip label="View mode">
                        <Eye onClick={() => setIsViewMode(!isViewMode)} style={{ color: !isViewMode ? 'var(--mantine-color-dark-0)' : '', cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip label="Edit mode">
                        <Pencil onClick={() => setIsViewMode(!isViewMode)} style={{ color: isViewMode ? 'var(--mantine-color-dark-0)' : '', cursor: 'pointer' }} />
                    </Tooltip>
                </Group>
            </Flex>
        </Center>
    )
}