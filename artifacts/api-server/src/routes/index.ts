import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import bannersRouter from "./banners";
import servicesRouter from "./services";
import promotionsRouter from "./promotions";
import feedbackRouter from "./feedback";
import postsRouter from "./posts";
import bookingsRouter from "./bookings";
import contactRouter from "./contact";
import settingsRouter from "./settings";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(bannersRouter);
router.use(servicesRouter);
router.use(promotionsRouter);
router.use(feedbackRouter);
router.use(postsRouter);
router.use(bookingsRouter);
router.use(contactRouter);
router.use(settingsRouter);
router.use(dashboardRouter);

export default router;
