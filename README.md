# Brain interview app

## How to use

### Prerequisites

Please install following prerequisites before attempting to run the project.

- docker
- gnu make

### Development

Start dev mode

```bash
make dev
```

Start production mode

```bash
make prod
```

Running yarn command

```bash
make yanr c="your yarn command"
```

Connect to next app docker bash

```bash
make sh-next-app
```

After updating graphql.schema please run
```bash
make yarn c="gql:codegen"
```