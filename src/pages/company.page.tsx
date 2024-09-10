import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { getCompany } from "../utils/queries";
import { Company as TCompamy } from "../types";
import { Button, Card, Center, Flex, Group, Loader, Stack, Text, TextInput, } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useState } from "react";
import { CircleChevronLeft, Edit, } from "lucide-react";
import { updateCompany } from "../utils/mutations";
import { fakeApi } from "../utils/functions";
import { toast } from "sonner";
import { AnimatePresence, motion, Variants } from 'framer-motion'

export async function loader(args: LoaderFunctionArgs<any>) {
    const company = await getCompany(args.params.id!)
    return company.data as TCompamy
}

const cardItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
}

const cardContentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1,
        }
    },
}
const cardButtonVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

const editCompanySchema = z.object({
    name: z.string(),
    city: z.string(),
    countryName: z.string().min(1, { message: 'Country Name is required' }),
    description: z.string(),
    phone: z.string(),
    // phone: z.string(),
    postCode: z.string(),
    id: z.string().min(1)
})

export function Company() {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [company, setCompany] = useState(() => useLoaderData() as TCompamy)
    // const company = useLoaderData() as TCompamy
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
            setCompany({ ...company, ...data, headOffice: { ...company.headOffice, address: { ...company.headOffice.address, postCode: data.postCode } } })
        } catch (error) {
            toast.error('Opps, something went wrong.')
        } finally {
            setIsSubmiting(false)
        }
    }

    return (
        <Center h={'100vh'} className="">
            <Flex direction={'column'} justify={'center'} align={'center'} >
                <Group w={'100%'} mb={15} >
                    <CircleChevronLeft cursor={'pointer'} className="text-gray-400 hover:text-gray-700 transition-colors duration-200" onClick={() => navigate(-1)} />
                </Group>
                <Card withBorder radius={'md'} p={40} shadow="md" className="lg:w-[500px] w-[300px]">
                    <Group justify="space-between" >
                        <Stack gap={1} >
                            <Text fw={500} fz={'h3'} color="gray.8" >Company Details</Text>
                            <Text fw={400} fz={'sm'} color="gray.8" className="opacity-50" >Basic information of the company.</Text>
                        </Stack>
                        <AnimatePresence mode="wait" >
                            {isViewMode ?
                                <motion.div
                                    variants={cardButtonVariants}
                                    initial={'hidden'}
                                    animate={'visible'}
                                    exit={'hidden'}
                                >
                                    <Edit size={20} cursor={'pointer'} onClick={() => setIsViewMode(false)} className="text-gray-400 hover:text-gray-700 transition-colors duration-200" />
                                </motion.div>
                                : null}
                        </AnimatePresence>
                    </Group>
                    <AnimatePresence mode="wait" >
                        {isViewMode ?
                            <motion.div key="view"
                                variants={cardContentVariants}
                                initial={'hidden'}
                                animate={'visible'}
                                exit={'hidden'}
                                className="lg:max-h-[600px] max-h-[400px] flex flex-col overflow-y-auto mb-2 gap-3 mt-8" >
                                <motion.div key={'name'} variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                    <Text fw={500} fz={'md'} color="gray.8">Company Name</Text>
                                    <Text fw={400} fz={'sm'} color="gray.8"> {company.name} </Text>
                                </motion.div>
                                {company.description ?
                                    <motion.div key={'description'} variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                        <Text fw={500} fz={'md'} color="gray.8">Description</Text>
                                        <Text fw={400} fz={'sm'} color="gray.8" className="" > {company.description} </Text>
                                    </motion.div>
                                    : null}
                                {company.client ?
                                    <motion.div variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                        <Text fw={500} fz={'md'} color="gray.8">Client</Text>
                                        <Text fw={400} fz={'sm'} color="gray.8"> {company.client} </Text>
                                    </motion.div>
                                    : null}
                                {company.headOffice.address.cityName ?
                                    <motion.div variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                        <Text fw={500} fz={'md'} color="gray.8">City</Text>
                                        <Text fw={400} fz={'sm'} color="gray.8"> {company.headOffice.address.cityName} </Text>
                                    </motion.div>
                                    : null}
                                {company.phone ?
                                    <motion.div variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                        <Text fw={500} fz={'md'} color="gray.8">Phone</Text>
                                        <Text fw={400} fz={'sm'} color="gray.8"> {company.phone} </Text>
                                    </motion.div>
                                    : null}
                                {company.headOffice.address.countryName ?
                                    <motion.div variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                        <Text fw={500} fz={'md'} color="gray.8">Country</Text>
                                        <Text fw={400} fz={'sm'} color="gray.8"> {company.headOffice.address.countryName} </Text>
                                    </motion.div>
                                    : null}
                                {company.headOffice.address.postCode ?
                                    <motion.div variants={cardItemVariants} className="flex flex-col justify-between gap-2">
                                        <Text fw={500} fz={'md'} color="gray.8">Post Code</Text>
                                        <Text fw={400} fz={'sm'} color="gray.8"> {company.headOffice.address.postCode} </Text>
                                    </motion.div>
                                    : null}
                            </motion.div>
                            :
                            <motion.div
                                variants={cardContentVariants}
                                initial={'hidden'}
                                animate={'visible'}
                                exit={'hidden'}
                                className="lg:max-h-[600px] max-h-[400px] flex flex-col overflow-y-auto mb-2 gap-3 mt-8" >
                                <form onSubmit={form.onSubmit(onSubmit)}>
                                    <Stack gap={"lg"} >
                                        <TextInput key={form.key('id')} {...form.getInputProps('id')} className="hidden" disabled={isViewMode} />
                                        <motion.div className="flex flex-col justify-between gap-2" variants={cardItemVariants}>
                                            <Text >Name </Text>
                                            <TextInput key={form.key('name')} {...form.getInputProps('name')} disabled={isViewMode} />
                                        </motion.div>
                                        <motion.div className="flex flex-col justify-between gap-2" variants={cardItemVariants}>
                                            <Text>Description </Text>
                                            <TextInput key={form.key('description')} {...form.getInputProps('description')} disabled={isViewMode} />
                                        </motion.div>
                                        <motion.div className="flex flex-col justify-between gap-2" variants={cardItemVariants}>
                                            <Text>City </Text>
                                            <TextInput key={form.key('city')} {...form.getInputProps('city')} disabled={isViewMode} />
                                        </motion.div>
                                        <motion.div className="flex flex-col justify-between gap-2" variants={cardItemVariants}>
                                            <Text>Phone </Text>
                                            <TextInput key={form.key('phone')} {...form.getInputProps('phone')} disabled={isViewMode} />
                                        </motion.div>
                                        <motion.div className="flex flex-col justify-between gap-2" variants={cardItemVariants}>
                                            <Text>Post code </Text>
                                            <TextInput key={form.key('postCode')} {...form.getInputProps('postCode')} disabled={isViewMode} />
                                        </motion.div>
                                        <motion.div className="flex flex-col justify-between gap-2" variants={cardItemVariants}>
                                            <Text>Country Name </Text>
                                            <TextInput key={form.key('countryName')} {...form.getInputProps('countryName')} disabled={isViewMode} />
                                        </motion.div>
                                        {!isViewMode ?
                                            <Group justify="flex-end" mt="md">
                                                <Button disabled={isSubmiting} variant="white" onClick={() => setIsViewMode(true)} >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={isSubmiting} >
                                                    {isSubmiting ? <Group gap={5} ><Loader size={20} />  Update </Group> : 'Update'}
                                                </Button>
                                            </Group>
                                            : null}
                                    </Stack>
                                </form>
                            </motion.div>
                        }
                    </AnimatePresence>

                </Card>
            </Flex>
        </Center>
    )
}