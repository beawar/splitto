// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import m0000 from "./0000_confused_blonde_phantom.sql";
import m0001 from "./0001_black_vin_gonzales.sql";
import m0002 from "./0002_blushing_epoch.sql";
import m0003 from "./0003_fast_sleeper.sql";
import m0004 from "./0004_daffy_killmonger.sql";
import m0005 from "./0005_wakeful_quicksilver.sql";
import journal from "./meta/_journal.json";

export default {
  journal,
  migrations: {
    m0000,
    m0001,
    m0002,
    m0003,
    m0004,
    m0005,
  },
};
