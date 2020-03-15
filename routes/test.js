
let express = require("express");
const router = express.Router();

router.get('/.well-known/acme-challenge/LSzA7UVbhGKVq_kTYerfm85OVuF9DOzN4Kna8L4HfbY', (req, res) => {
   res.send("LSzA7UVbhGKVq_kTYerfm85OVuF9DOzN4Kna8L4HfbY.U1euALfGjPYQO87Zf9E8Uv35rrL8jytFfwkPHPoKjTc");
});

module.exports = router;
