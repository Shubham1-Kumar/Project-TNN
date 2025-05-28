FROM node:22-alpine

# Declare build-time variables
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXT_PUBLIC_NEWS_API_KEY
ARG OPENAI_API_KEY

# Set working directory
WORKDIR /TNN

# Install dependencies
COPY package*.json ./

COPY ./prisma ./prisma

RUN npm install

# Export env vars for the build
ENV DATABASE_URL=$DATABASE_URL \
    NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
    NEXTAUTH_URL=$NEXTAUTH_URL \
    GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
    GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
    NEXT_PUBLIC_NEWS_API_KEY=$NEXT_PUBLIC_NEWS_API_KEY \
    OPENAI_API_KEY=$OPENAI_API_KEY

# Generate Prisma client and build the app
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]


# Healthcheck to ensure the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# to build the image first you need to setup the .env as given in the .env.example file
# then run the below command to build the image directly without using docker-compose

# export variables from your .env file
# Make sure to have a .env file with the required variables
# You can use the following command to export the variables from your .env file

# export $(cat .env | xargs)
# docker build -t image_name \
#   --build-arg DATABASE_URL=$DATABASE_URL \
#   --build-arg NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
#   --build-arg NEXTAUTH_URL=$NEXTAUTH_URL \
#   --build-arg GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
#   --build-arg GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
#   --build-arg NEXT_PUBLIC_NEWS_API_KEY=$NEXT_PUBLIC_NEWS_API_KEY \
#   --build-arg OPENAI_API_KEY=$OPENAI_API_KEY \
#   .


