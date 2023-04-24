"use client"

import { features } from "@/constants"
import {
  
  Col,
  Container,
  Grid,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  createStyles,
  rem,
} from "@mantine/core"

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(36),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}))

export default function FeaturesSection() {
  const { classes } = useStyles()

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={rem(26)} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ))

  return (
    <Container>
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={5}>
            <Title className={classes.title} order={2}>
              Reliable translator for you
            </Title>
            <Text c="dimmed">
              Translate everything you want with our translator. We have a lot
              of languages for you.
            </Text>
            
          </Col>
          <Col span={12} md={7}>
            <SimpleGrid
              cols={2}
              spacing={30}
              breakpoints={[{ maxWidth: "md", cols: 1 }]}
            >
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    </Container>
  )
}
