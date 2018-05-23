
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
//admin routes
const adminPipelineRouter = require('./routes/admin.routes/admin.pipeline.router');
const adminOrganizationRouter = require('./routes/admin.routes/admin.organization.router');
const adminCampaignRouter = require('./routes/admin.routes/admin.campaign.router');
const adminProductRouter = require('./routes/admin.routes/admin.products.router');
//orgLeader routes
const orgLeaderOrderRouter = require('./routes/org.leader.routes/org.leader.order.router');

// const orgLeaderRouter = require('./routes/org.leader.router');
// const customerRouter = require('./routes/customer.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
//admin routes
app.use('/admin/pipeline', adminPipelineRouter);
app.use('/admin/organization', adminOrganizationRouter);
app.use('/admin/campaign', adminCampaignRouter);
app.use('/admin/product', adminProductRouter);
//org Leader routes
app.use('/orgleader/order',orgLeaderOrderRouter);
// app.use('/api/orgleader', orgLeaderRouter);
// app.use('/api/customer', customerRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
