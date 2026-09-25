# ShopFlow - E-Commerce DevOps Practice Application

## 1. Project Overview

**Project Name:** ShopFlow

**Project Type:** Full-stack E-Commerce Web Application

**Primary Purpose:** DevOps practice project

**Frontend / Application:** Next.js

**Database:** Supabase PostgreSQL

**Containerization:** Docker

**CI/CD:** GitHub Actions

**Infrastructure:** Terraform will be created separately by the developer

**UI/UX Reference:** Context7 must be used to research current Next.js, Supabase, Tailwind CSS, and relevant UI/UX documentation before implementation.

---

# 2. Project Goal

Build a small but production-style e-commerce application that provides hands-on DevOps practice.

The application should allow users to:

- Browse products
- View product details
- Search products
- Filter products
- Add products to a shopping cart
- Update cart quantities
- Remove products from the cart
- Create an account
- Log in and log out
- Place orders
- View previous orders

An admin should be able to:

- Add products
- Edit products
- Delete products
- Manage stock
- View orders
- Update order status

The application should be designed so it can later be deployed using infrastructure created separately with Terraform.

---

# 3. DevOps Learning Objectives

The project should provide practical experience with:

- Next.js production deployment
- Docker
- Docker image creation
- Docker Compose
- GitHub Actions
- CI/CD pipelines
- Environment variables
- Supabase PostgreSQL
- Database migrations
- Application health checks
- Production builds
- Container networking
- Image tagging
- Secrets management
- Deployment automation
- AWS deployment preparation
- Infrastructure as Code

**Terraform is not part of this application implementation. The developer will create the Terraform infrastructure separately.**

---

# 4. Technology Stack

## Application

- Next.js
- TypeScript
- React
- Tailwind CSS

## Database

- Supabase
- PostgreSQL

## Authentication

- Supabase Authentication
- Email/password registration
- Email/password login
- Logout
- Protected user pages

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Terraform later, separately

---

# 5. UI/UX Requirements

Use **Context7** during development to research and follow the latest relevant documentation and recommended implementation patterns.

Context7 should be used for:

- Next.js
- Supabase
- Tailwind CSS
- Any UI component library used
- Authentication patterns
- Server/client component patterns
- Relevant API and framework documentation

## Design Requirements

The application should have:

- Modern production-style e-commerce UI
- Responsive design
- Mobile-friendly navigation
- Desktop-friendly layout
- Clean product cards
- Consistent typography
- Consistent spacing
- Accessible buttons and forms
- Loading states
- Empty states
- Error states
- Success states
- Clear shopping cart experience

Do not randomly redesign existing pages while implementing features.

Maintain one consistent visual design system throughout the application.

---

# 6. Main Pages

## Home Page

Route:

```text
/
```

Include:

- Navigation
- Hero section
- Featured products
- Product categories
- Call-to-action section
- Footer

---

## Products Page

Route:

```text
/products
```

Features:

- Product grid
- Search
- Category filtering
- Price filtering
- Sorting
- Pagination or load-more behavior

Each product card should display:

- Product image
- Product name
- Price
- Category
- Stock status
- View product button
- Add to cart button

---

## Product Details

Route:

```text
/products/[id]
```

Display:

- Product image
- Product name
- Description
- Price
- Category
- Available stock
- Quantity selector
- Add to cart button

---

## Cart

Route:

```text
/cart
```

Features:

- Product list
- Quantity controls
- Remove product
- Subtotal
- Total
- Empty-cart state
- Proceed to checkout button

---

## Checkout

Route:

```text
/checkout
```

Features:

- Customer information
- Shipping address
- Order summary
- Total price
- Place order button

For this practice project, do not integrate a real payment gateway unless explicitly required later.

Checkout may simulate successful order placement.

---

## Authentication

### Login

```text
/login
```

### Register

```text
/register
```

### Account

```text
/account
```

Users should be able to:

- View profile information
- View previous orders
- Log out

---

# 7. Orders

Route:

```text
/account/orders
```

Users should be able to see:

- Order ID
- Order date
- Total amount
- Order status
- Ordered products

Possible order statuses:

```text
pending
processing
shipped
delivered
cancelled
```

---

# 8. Admin Dashboard

Route:

```text
/admin
```

The admin dashboard must be protected.

## Products

Route:

```text
/admin/products
```

Admin can:

- Create products
- Edit products
- Delete products
- Update stock
- Change category

## Orders

Route:

```text
/admin/orders
```

Admin can:

- View orders
- View order details
- Update order status

---

# 9. Database Design

Use Supabase PostgreSQL.

Create the following main tables.

## profiles

Fields:

```text
id
email
full_name
role
created_at
updated_at
```

Roles:

```text
customer
admin
```

---

## categories

Fields:

```text
id
name
slug
description
created_at
```

---

## products

Fields:

```text
id
category_id
name
slug
description
price
stock_quantity
image_url
is_active
created_at
updated_at
```

---

## cart_items

Fields:

```text
id
user_id
product_id
quantity
created_at
updated_at
```

---

## orders

Fields:

```text
id
user_id
total_amount
status
shipping_name
shipping_address
shipping_city
shipping_postal_code
created_at
updated_at
```

---

## order_items

Fields:

```text
id
order_id
product_id
product_name
quantity
unit_price
subtotal
```

Store product name and price in the order item so historical orders remain accurate even if the product changes later.

---

# 10. Database Relationships

Required relationships:

```text
categories
    |
    └── products

profiles
    |
    ├── cart_items
    |
    └── orders
             |
             └── order_items

products
    |
    ├── cart_items
    |
    └── order_items
```

Use appropriate foreign keys.

---

# 11. Supabase Security

Use Supabase Row Level Security where appropriate.

Customers should only be able to:

- Read their own cart
- Modify their own cart
- Read their own orders
- Create their own orders
- Read their own profile

Admins should have appropriate access to:

- Products
- Categories
- Orders

Never expose the Supabase service-role key to browser/client-side code.

Never commit secrets to Git.

---

# 12. Environment Variables

Create:

```text
.env.example
```

Document required variables such as:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Do not commit the real `.env` file.

The application should fail clearly when required environment variables are missing.

---

# 13. Docker Requirements

Create:

```text
Dockerfile
.dockerignore
docker-compose.yml
```

The Dockerfile should:

- Use a suitable Node.js base image
- Install dependencies
- Build the Next.js application
- Run the production application
- Use a multi-stage build where appropriate
- Keep the final image as small as reasonably practical
- Include only required production files/dependencies
- Expose the required application port

---

# 14. Docker Compose

Create:

```text
docker-compose.yml
```

Docker Compose should support local development/testing.

Supabase is the external database provider, so do not create a separate PostgreSQL container unless there is a specific reason later.

Compose should support:

- Application container
- Environment variables
- Local development
- Application networking
- Health checking where appropriate

---

# 15. Application Health Check

Create:

```text
/api/health
```

The endpoint should return a simple response indicating that the application is running.

Example:

```json
{
  "status": "ok"
}
```

If practical, the endpoint may also verify database connectivity without exposing sensitive information.

---

# 16. GitHub Actions

Create:

```text
.github/workflows/
```

At minimum:

```text
.github/workflows/ci.yml
.github/workflows/docker.yml
```

---

## CI Workflow

Run the CI workflow on:

- Push
- Pull request

It should perform appropriate checks:

1. Checkout repository
2. Install dependencies
3. Run linting
4. Run TypeScript checks
5. Run tests if tests exist
6. Build the Next.js application

The workflow must fail when a required check fails.

---

## Docker Workflow

Create a workflow that:

1. Checks out the repository
2. Sets up Docker Buildx
3. Builds the Docker image
4. Tags the image using the Git commit SHA where appropriate
5. Validates that the Docker image builds successfully

If a container registry is configured later, extend the workflow to push the image.

Never hard-code registry credentials.

Use GitHub Actions Secrets for credentials.

---

# 17. Testing

Add basic application tests.

At minimum test:

- Homepage rendering
- Product listing
- Product details
- Cart behavior
- Protected routes
- Health endpoint

Also verify:

```bash
npm run lint
npm run build
```

before considering the application complete.

Docker validation should also be performed:

```bash
docker build .
```

and, where applicable:

```bash
docker compose up --build
```

---

# 18. Project Structure

Use a clean Next.js structure.

Suggested structure:

```text
shopflow/
│
├── app/
│   ├── page.tsx
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── login/
│   ├── register/
│   ├── account/
│   ├── admin/
│   └── api/
│       └── health/
│
├── components/
│   ├── ui/
│   ├── products/
│   ├── cart/
│   ├── navigation/
│   └── admin/
│
├── lib/
│   ├── supabase/
│   ├── utils/
│   └── validations/
│
├── types/
│
├── tests/
│
├── public/
│
├── supabase/
│   └── migrations/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── docker.yml
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── package.json
├── README.md
└── ...
```

The exact structure may be adjusted to match the current Next.js architecture.

---

# 19. Seed Data

Create development seed data.

Include:

- At least 3 categories
- At least 10 products
- Different prices
- Different stock quantities
- Some products with zero/low stock
- Product images using appropriate image URLs or local development assets

The seed process should be documented in the README.

---

# 20. Authentication and Authorization

Use Supabase Auth.

Authentication flow:

```text
Register
   ↓
Supabase Auth
   ↓
Profile created
   ↓
Customer account
```

Admin access must not depend only on hiding UI elements.

Authorization must be enforced server-side and through database policies where appropriate.

---

# 21. Error Handling

Implement clear error handling for:

- Database errors
- Authentication errors
- Invalid product IDs
- Invalid form input
- Empty cart
- Out-of-stock products
- Failed order creation
- Unauthorized admin access
- Missing environment variables

Use user-friendly messages.

Do not expose database credentials, stack traces, or sensitive server information to users.

---

# 22. Validation

Validate user input on the server.

Validate:

- Product information
- Prices
- Quantities
- Shipping information
- Authentication forms
- Order data

Use a suitable validation library if needed.

---

# 23. Performance Considerations

Follow Next.js best practices.

Consider:

- Server Components where appropriate
- Client Components only when interaction requires them
- Optimized image handling
- Efficient database queries
- Pagination for larger product lists
- Avoiding unnecessary client-side data fetching
- Avoiding unnecessary JavaScript

Use Context7 to confirm current recommended Next.js patterns before implementation.

---

# 24. Security Requirements

The application must:

- Never expose service-role credentials
- Never commit `.env` files
- Validate server-side input
- Protect admin routes
- Use Supabase RLS
- Avoid trusting client-provided prices during order creation
- Verify product availability server-side
- Prevent users from modifying another user's cart/order data
- Keep secrets in environment variables or CI/CD secrets

---

# 25. README Requirements

Create a detailed:

```text
README.md
```

The README should document:

- Project overview
- Technology stack
- Local setup
- Supabase setup
- Environment variables
- Database migrations
- Seed data
- Running the application
- Running with Docker
- Running with Docker Compose
- Running tests
- CI/CD workflow
- Deployment preparation
- Future Terraform deployment

Include exact commands where appropriate.

---

# 26. DevOps Workflow

The intended development lifecycle is:

```text
Developer
   |
   v
Git Repository
   |
   v
GitHub
   |
   +--------------------+
   |                    |
   v                    v
CI Workflow       Docker Workflow
   |                    |
   v                    v
Lint/Test/Build    Docker Image Build
   |                    |
   +----------+---------+
              |
              v
        Deployment
              |
              v
       Cloud Infrastructure
              ^
              |
          Terraform
```

Terraform infrastructure will be developed separately.

---

# 27. Suggested Git Workflow

Use feature branches.

Example:

```text
main
 |
 +-- feature/products
 |
 +-- feature/cart
 |
 +-- feature/auth
 |
 +-- feature/orders
 |
 +-- feature/admin
 |
 +-- feature/docker
 |
 +-- feature/ci-cd
```

Use pull requests before merging important changes into `main`.

---

# 28. Definition of Done

The project is considered complete when:

- Next.js application runs successfully
- Supabase database is connected
- Authentication works
- Products can be displayed
- Product details work
- Search/filtering works
- Cart works
- Checkout creates orders
- Users can view their orders
- Admin can manage products
- Admin can manage order status
- Supabase RLS is configured
- Health endpoint works
- Docker image builds successfully
- Docker Compose works
- CI workflow passes
- Docker workflow passes
- `.env.example` exists
- No secrets are committed
- Tests pass
- Production build passes
- README contains setup instructions

---

# 29. Agent / Coding Instructions

When implementing this project, the coding agent must:

1. Investigate the existing repository before making changes.
2. Follow the existing architecture if a project already exists.
3. Use Context7 for current framework/library documentation where relevant.
4. Do not unnecessarily introduce new libraries.
5. Do not redesign unrelated parts of the application.
6. Do not break existing functionality.
7. Implement features incrementally.
8. Keep application, database, Docker, and CI/CD concerns clearly separated.
9. Use secure environment-variable handling.
10. Test changes before reporting completion.
11. Run linting and production builds.
12. Validate Docker builds.
13. Validate GitHub Actions workflow syntax/configuration where possible.
14. Report exactly what was implemented and what was tested.
15. If something cannot be verified, state it clearly instead of claiming it works.

---

# 30. Out of Scope

The following are intentionally excluded from the initial version:

- Real payment gateway
- Complex recommendation engine
- Microservices architecture
- Kubernetes deployment
- Terraform implementation
- Advanced analytics
- Real-time chat
- Multi-vendor marketplace
- Complex shipping provider integrations

These can be added later as separate DevOps practice stages.

---

# 31. Future DevOps Expansion

After the application is working, the project can be expanded with:

```text
Stage 1
Next.js + Supabase

Stage 2
Docker

Stage 3
GitHub Actions CI

Stage 4
Docker image publishing

Stage 5
Terraform

Stage 6
AWS deployment

Stage 7
HTTPS / domain

Stage 8
Monitoring and logging

Stage 9
Container orchestration

Stage 10
Production-style observability
```

The initial implementation should remain simple enough to understand while still providing realistic DevOps practice.
