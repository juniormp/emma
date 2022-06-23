# Setup Docker
`docker-compose up` 

# Setup Project
`npm install` 
`npm run dev` 

# Prisma
The db schema can be check with the follow command 
`npx prisma studio` 

# Endpoints
[post] `/buy-share` -> Buy share from broker's account. 
Needs to request this endpoint first to have shares that can be rewarded to users

[post] `/claim` -> Claim user's reward
