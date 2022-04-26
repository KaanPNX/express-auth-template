var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

/* GET users listing. */


router.post("/signup", passport.authenticate("signup", {
    session: !1
}), async (s, n, r) => {
    n.json({
        message: "Signup successful",
        user: s.user
    })
});

router.post("/login", async (s, n, r) => {
    passport.authenticate("login", async (e, t, o) => {
        try {
            if (e || !t) {
                const s = new Error("An error occurred.");
                return r(s)
            }
            s.login(t, {
                session: !1
            }, async s => {
                if (s) return r(s);
                const e = {
                        _id: t._id,
                        email: t.email
                    },
                    o = jwt.sign({
                        user: e
                    }, "TOP_SECRET");
                return n.json({
                    token: o
                })
            })
        } catch (s) {
            return r(s)
        }
    })(s, n, r)
});


module.exports = router;
