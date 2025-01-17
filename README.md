
# FS-Blog - A Modern Fullstack Dev.to Style Multi-user blog

Built with Go FastSchema, Next.js App Router + NextAuth.js v5 and Chakra UI.

## Why

FastSchema is a No-Code Headless CMS, with built-in features: Admin Control Panel, File manger, OAS, RBAC, and more. But so far, I haven't found a good enough web front end to showcase its rich functionality. Because "Next.js has everything you need to build great products on the web.", so let me try...

Thanks to the dev.to clone repository on GitHub for giving me the courage to try it.

> **Note:** Please note that this is only an experimental demo system. The backend is basically stable, and the backend is still iterating... 

The code was written for [this article](https://www.worldlink.com.cn/post/build-a-devto-style-multi-user-blog-with-fastschema-nextjs-nextauth-v5-and-chakra-ui.html).

## Tech Stack:

> Frontend

-   React
-   Next.js App Router
-   NextAuth.js v5
-   Chakra UI v2
-   SWR
-   Axios

> Backend

-   FastSchema
-   SQLite (with demo data)
-   seeder

## Getting started

To get started with this project, run

### Backend

```bash
  git clone https://github.com/vulcangz/fs-blog.git
  cd blog
  go mod tidy
  go run .
```

visiting http://localhost:8000/dash 

### Test accounts

```
ADMIN: admin/123456
User: test1~test5/123456
```

After logging in, administrators can access the documents: http://localhost:8000/docs 


### Frontend

```bash  
  cd web
  pnpm i
  pnpm dev
```

visiting http://localhost:3000

and that's all you need to get started!


## Acknowledgements

- [FastSchema](https://github.com/fastschema/fastschema) for making this possible
- [Next.js](https://github.com/vercel/next.js) for making this possible
- [MA-Ahmad/dev.to-clone](https://github.com/MA-Ahmad/dev.to-clone)
- [Dev Community Clone](https://github.com/zwelhtetyan/dev.to-clone)
- [spicy-tomato/tech-blog](https://github.com/spicy-tomato/tech-blog)
- more...

## License

[MIT](https://choosealicense.com/licenses/mit/)
