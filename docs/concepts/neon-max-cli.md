# The Neon Max CLI

The Neon Max CLI is a helper CLI tools specifically made to make your development with the Neon Max starter kit even more efficient.

## Links

- [Repo](https://github.com/AnsellMaximilian/neon-max-cli)
- [NPM package](https://www.npmjs.com/package/neon-max-cli)

## Initialize a New Neon Max Project

You can use Git to clone Neon Max the traditional way, but to make it even easier, you can use the Neon Max CLI `init` command:

```bash
npx neon-max-cli init project-name
```

Running this command will automatically clone the correct latest Neon Max starter kit under `folder-where-you-ran-the-command/project-name`. Doing it this way lets you to complete the cloning and installing the dependencies in one command.

## Generate a New Resource Model

Once you have initialized a Neon Max project and you've decided you want to create a new model, you can use the Neon Max CLI `generate:model` command. It should be noted what generating a model means:

- Creating a new Prisma model inside `prisma/schema.prisma`
- Syncing it with the Neon database

You can do all of that manually, but wit the heelp of the `generate:model` command, a lot will be done for you automatically:

```bash
npx generate:model ModelName
```

Parameters:

- `ModelName`: the name of your model. Should be typed in **Pascal Case**.

Flags:

- `-a` or `--action`: provide this flag to generate basic CRUD (Create, Read, Update, Delete) server actions under `actions/modelName.ts`.

### Generate Server Actions

As mentioned before, you can provide an `-a` flag to also generate CRUD server actions alongside the model definition for Prisma. These are the actions that the command will generate (`ModelName` will be used as the example model created):

- `createModelName()`: create a record.
- `getModelNameById()`: get one record by `id`.
- `getAllModelNames()`: get all records.
- `updateModelName()`: update a record by `id`.
- `deleteModelName()`: delete record by `id`.
