# Storage

Local upload directory in dev. The contents of `uploads/` are gitignored — never commit user-uploaded files.

In production this folder is replaced by an S3-compatible object store (Cloudflare R2 by default). The backend's storage adapter (`backend/src/lib/storage/`) abstracts the difference; see `docs/ARCHITECTURE.md` §5.

## Layout

```
storage/
├── uploads/        runtime, gitignored
└── README.md
```

Drop a `.gitkeep` into `uploads/` if you want the folder tracked without its contents.
