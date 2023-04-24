"use client"
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link';

interface QuizCardProps {
    imageSrc: string;
    title: string;
    badge: string;
    description: string;
    buttonTitle: string;
    buttonHref: string;

}
const QuizCard: React.FC<QuizCardProps> = ({ imageSrc, title, badge, description, buttonTitle, buttonHref }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="md:w-[420px] xl:w-[500px] w-[251px]" >
            <Card.Section className=" ">
                <Image
                    src={imageSrc}

                    alt={badge}
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500} fz={"lg"}>{title}</Text>
                <Badge color="pink" variant="light" size="lg">
                    {badge}
                </Badge>
            </Group>

            <Text size="sm" color="dimmed">
                {description}
            </Text>

            <Link href={buttonHref}>
                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    {buttonTitle}
                </Button>
            </Link>
        </Card>)
}

export default QuizCard