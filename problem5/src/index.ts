import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import { ParsedQs } from "qs";
import { ORIGIN, PORT } from "./constants";
import path from "path";
import router from "./routers";

const app: Express = express();
const server = new http.Server(app);

app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ limit: "64mb", extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: ORIGIN,
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);
app.use(morgan("dev"));

app.set("trust proxy", 1);

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(
	compression({
		level: 6,
		threshold: 100 * 1000,
		filter: shouldCompress,
	})
);

function shouldCompress(
	req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
	res: express.Response<any, Record<string, any>>
) {
	if (req.headers["x-no-compression"]) {
		// don't compress responses with this request header
		return false;
	}
	// fallback to standard filter function
	return compression.filter(req, res);
}
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", router);
app.all("*", (_req, res) => {
	res.render("pages/404", {
		title: "404",
	});
});
server.listen(PORT, () => {
	process.on("exit", function () {
		server.close();
	});
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
