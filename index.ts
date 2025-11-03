import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// lunar scammers.
app.use((req: Request, res: Response, next) => {
  console.log(`// fuck u lunar scammers`);
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


app.get("/launcher/status", (req: Request, res: Response) => {
  res.json({
    version: "1.2!",
    status: "ok",
    uptime: Math.floor(process.uptime()), 
  });
});


// polls!
app.get("/api/launcher/poll-auth", (req: Request, res: Response) => {
  res.json({
    ticketId: `FAKE_TICKET_${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    state: "Queued",
    queuedPlayers: 0,
    estimatedWaitSec: 0,
    status: "ok",
  });
});


// Usage: /account/api/get-email?username=LUNA
 
app.get("/account/api/get-email", (req: Request, res: Response) => {
  const username = (req.query.username as string) || "unknown";
  const email = `${username.replace(/\s+/g, "").toLowerCase()}@local.mock`;
  res.json({
    username,
    email,
    message: "This is a mocked email for local testing only.",
  });
});


app.post("/bypass", (req: Request, res: Response) => {
  // will not work you need to add it LMAO!
  const username = (req.body?.username as string) || "anonymous";
  res.json({
    success: true,
    note: "yes",
    username,
    token: `LOCAL_FAKE_TOKEN_${Math.random().toString(36).slice(2, 10)}`,
    profile: {
      displayName: username,
      id: Math.floor(Math.random() * 1_000_000),
      email: `${username.replace(/\s+/g, "").toLowerCase()}@local.mock`,
    },
  });
});


app.post("/api/launcher/login", (req: Request, res: Response) => {
  const { username } = req.body || { username: "unknown" };
  res.json({
    ok: true,
    message: "yes!",
    username,
    token: `LOCAL_LOGIN_TOKEN_${Math.random().toString(36).slice(2, 10)}`,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Lunar is a Scam!.");
});

app.listen(port, () => {
  console.log(`[DEV] SERVER at http://127.0.0.1:${port}`);
});

