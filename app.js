(() => {
  "use strict";

  const STORAGE_KEY = "mobile-trip-planner-v1";
  const APP_VERSION = 9;
  const DAY_COLORS = ["#0f766e", "#e07a2d", "#3568b8", "#9c4d8f", "#b25f3a", "#4c8b4c"];
  const TRANSPORT = {
    walk: { label: "步行", icon: "footprints", speed: 4.5 },
    transit: { label: "公交地铁", icon: "bus-front", speed: 20 },
    taxi: { label: "打车", icon: "car-taxi-front", speed: 26 },
    drive: { label: "自驾", icon: "car-front", speed: 32 }
  };
  const CATEGORY = {
    attraction: { label: "景点", icon: "landmark" },
    restaurant: { label: "餐厅", icon: "utensils" },
    shopping: { label: "购物", icon: "shopping-bag" },
    transport: { label: "交通", icon: "train-front" },
    hotel: { label: "住宿", icon: "bed-double" }
  };
  const WEATHER = {
    0: ["晴朗", "sun"],
    1: ["大部晴朗", "sun"],
    2: ["多云", "cloud-sun"],
    3: ["阴天", "cloud"],
    45: ["有雾", "cloud-fog"],
    48: ["雾凇", "cloud-fog"],
    51: ["小毛毛雨", "cloud-drizzle"],
    53: ["毛毛雨", "cloud-drizzle"],
    55: ["较强毛毛雨", "cloud-drizzle"],
    56: ["冻毛毛雨", "cloud-hail"],
    57: ["强冻毛毛雨", "cloud-hail"],
    61: ["小雨", "cloud-rain"],
    63: ["中雨", "cloud-rain"],
    65: ["大雨", "cloud-rain-wind"],
    66: ["冻雨", "cloud-hail"],
    67: ["强冻雨", "cloud-hail"],
    71: ["小雪", "cloud-snow"],
    73: ["中雪", "cloud-snow"],
    75: ["大雪", "cloud-snow"],
    77: ["米雪", "cloud-snow"],
    80: ["阵雨", "cloud-rain"],
    81: ["较强阵雨", "cloud-rain-wind"],
    82: ["强阵雨", "cloud-rain-wind"],
    85: ["阵雪", "cloud-snow"],
    86: ["强阵雪", "cloud-snow"],
    95: ["雷雨", "cloud-lightning"],
    96: ["雷雨伴冰雹", "cloud-hail"],
    99: ["强雷雨伴冰雹", "cloud-hail"]
  };

  const SAMPLE_STATE = {
    version: APP_VERSION,
    updatedAt: Date.now(),
    trip: {
      name: "天津国庆五日慢游",
      startDate: "2026-10-02",
      endDate: "2026-10-06",
      dayCities: {},
      cities: [
        {
          id: "tianjin",
          name: "天津",
          lat: 39.1175,
          lng: 117.2009
        }
      ]
    },
    settings: {
      theme: "system",
      orsKey: "",
      ai: {
        baseUrl: "https://api.deepseek.com",
        apiKey: "",
        model: "deepseek-flash"
      },
      amap: {
        key: "",
        securityCode: ""
      },
      supabase: {
        enabled: false,
        url: "",
        anonKey: "",
        tripId: "tianjin-demo",
        secret: ""
      }
    },
    activities: [
      {
        id: "sample-1",
        name: "古文化街",
        lat: 39.1437,
        lng: 117.1948,
        description: "天津传统街区，可以逛天后宫、看老字号，也适合边逛边吃。",
        day: 1,
        date: "2026-10-02",
        time: "09:30",
        duration: 110,
        transport: { mode: "taxi", duration: 20 },
        note: "先逛主街，再去河边；耳朵眼炸糕排队时换一家分店。",
        category: "attraction",
        status: "pending",
        order: 1,
        cityId: "tianjin"
      },
      {
        id: "sample-2",
        name: "天津之眼",
        lat: 39.1541,
        lng: 117.1874,
        description: "永乐桥上的摩天轮，是天津最醒目的城市地标之一，傍晚和夜景最舒服。",
        day: 1,
        date: "2026-10-02",
        time: "17:30",
        duration: 90,
        transport: { mode: "walk", duration: 25 },
        note: "提前预约；天气不好时改到后面补。",
        category: "attraction",
        status: "pending",
        order: 2,
        cityId: "tianjin"
      },
      {
        id: "sample-3",
        name: "意大利风情区",
        lat: 39.1402,
        lng: 117.2089,
        description: "海河北岸的历史街区，保留了大量意式建筑，适合散步和拍照。",
        day: 1,
        date: "2026-10-02",
        time: "19:20",
        duration: 70,
        transport: { mode: "walk", duration: 18 },
        note: "和世纪钟、解放桥可以串成一段河边散步。",
        category: "attraction",
        status: "pending",
        order: 3,
        cityId: "tianjin"
      },
      {
        id: "sample-4",
        name: "世纪钟",
        lat: 39.1365,
        lng: 117.2108,
        description: "天津站附近的城市地标，从意风区步行过来即可。",
        day: 1,
        date: "2026-10-02",
        time: "20:30",
        duration: 25,
        transport: { mode: "walk", duration: 10 },
        note: "夜景亮灯后拍照更好看。",
        category: "attraction",
        status: "pending",
        order: 4,
        cityId: "tianjin"
      },
      {
        id: "sample-5",
        name: "解放桥",
        lat: 39.1348,
        lng: 117.2123,
        description: "海河上的开启式桥梁，连接天津站与和平区一带，夜里很适合散步。",
        day: 1,
        date: "2026-10-02",
        time: "21:00",
        duration: 30,
        transport: { mode: "taxi", duration: 15 },
        note: "走完直接从附近打车回酒店。",
        category: "attraction",
        status: "pending",
        order: 5,
        cityId: "tianjin"
      },
      {
        id: "sample-6",
        name: "西开教堂",
        lat: 39.1173,
        lng: 117.1948,
        description: "天津著名的罗曼式教堂，红黄砖墙很有辨识度，周边就是滨江道商圈。",
        day: 2,
        date: "2026-10-03",
        time: "09:30",
        duration: 50,
        transport: { mode: "transit", duration: 30 },
        note: "开放时保持安静，不要影响礼拜。",
        category: "attraction",
        status: "pending",
        order: 1,
        cityId: "tianjin"
      },
      {
        id: "sample-7",
        name: "瓷房子",
        lat: 39.1248,
        lng: 117.2026,
        description: "用瓷片和古董装饰的独特建筑，适合看外立面并了解天津近代街区。",
        day: 2,
        date: "2026-10-03",
        time: "11:00",
        duration: 80,
        transport: { mode: "walk", duration: 18 },
        note: "外面拍照足够；如想入内，预留至少一小时。",
        category: "attraction",
        status: "pending",
        order: 2,
        cityId: "tianjin"
      },
      {
        id: "sample-8",
        name: "五大道",
        lat: 39.1129,
        lng: 117.1994,
        description: "天津最有代表性的历史街区之一，适合慢慢步行看建筑和小洋楼。",
        day: 2,
        date: "2026-10-03",
        time: "16:00",
        duration: 150,
        transport: { mode: "walk", duration: 12 },
        note: "从民园广场开始走，累了就找咖啡店休息。",
        category: "attraction",
        status: "pending",
        order: 3,
        cityId: "tianjin"
      },
      {
        id: "sample-9",
        name: "民园广场",
        lat: 39.1118,
        lng: 117.1989,
        description: "五大道里的开放式广场和休闲空间，适合作为 City Walk 起点或歇脚点。",
        day: 2,
        date: "2026-10-03",
        time: "18:10",
        duration: 50,
        transport: { mode: "taxi", duration: 25 },
        note: "晚霞时段人多，注意随身物品。",
        category: "attraction",
        status: "pending",
        order: 4,
        cityId: "tianjin"
      },
      {
        id: "sample-10",
        name: "天津欢乐谷",
        lat: 39.1864,
        lng: 117.4837,
        description: "大型主题乐园，适合安排完整一天。国庆期间热门项目排队较久。",
        day: 3,
        date: "2026-10-04",
        time: "09:30",
        duration: 480,
        transport: { mode: "taxi", duration: 55 },
        note: "提前买票。按“两个项目 + 一次长休息”的节奏玩，不追求全部刷完。",
        category: "attraction",
        status: "pending",
        order: 1,
        cityId: "tianjin"
      },
      {
        id: "sample-11",
        name: "江都路居民区早餐",
        lat: 39.1491,
        lng: 117.2344,
        description: "酒店附近的居民区早餐片区，适合一次尝煎饼果子、糖果子和大饼夹卷圈。",
        day: 4,
        date: "2026-10-05",
        time: "09:30",
        duration: 80,
        transport: { mode: "walk", duration: 12 },
        note: "睡到自然醒后出发。早餐店可能上午卖完就关门，尽量在十点前到。",
        category: "restaurant",
        status: "pending",
        order: 1,
        cityId: "tianjin"
      },
      {
        id: "sample-12",
        name: "幸福公园 / 回酒店休息",
        lat: 39.1531,
        lng: 117.238,
        description: "吃完早餐后在幸福公园附近慢走，然后回酒店休息，给下午留足体力。",
        day: 4,
        date: "2026-10-05",
        time: "11:00",
        duration: 90,
        transport: { mode: "walk", duration: 10 },
        note: "这一段不追求景点数量，重点是休息。",
        category: "hotel",
        status: "pending",
        order: 2,
        cityId: "tianjin"
      },
      {
        id: "sample-13",
        name: "体北庞记炸串",
        lat: 39.0800055,
        lng: 117.1820243,
        description: "安排在体院北附近的炸串午餐。具体门店位置请到店前用地图再次确认。",
        day: 4,
        date: "2026-10-05",
        time: "13:00",
        duration: 80,
        transport: { mode: "taxi", duration: 30 },
        note: "午餐后直接回酒店午休，不在附近继续加景点。",
        category: "restaurant",
        status: "pending",
        order: 3,
        cityId: "tianjin"
      },
      {
        id: "sample-14",
        name: "回酒店午休",
        lat: 39.1567417,
        lng: 117.2311227,
        description: "下午留出完整休息时间，避免连续几天行程导致疲劳。",
        day: 4,
        date: "2026-10-05",
        time: "14:30",
        duration: 120,
        transport: { mode: "taxi", duration: 30 },
        note: "至少休息到 16:30 再决定晚上去哪里。",
        category: "hotel",
        status: "pending",
        order: 4,
        cityId: "tianjin"
      },
      {
        id: "sample-15",
        name: "查漏补缺：天津之眼 / 五大道 / 海河",
        lat: 39.1541,
        lng: 117.1874,
        description: "根据前几天实际完成情况，二选一补漏：天津之眼、五大道，或者意风区和解放桥夜景。",
        day: 4,
        date: "2026-10-05",
        time: "16:30",
        duration: 150,
        transport: { mode: "taxi", duration: 25 },
        note: "不要三个都去。只选当天最想补的一个片区，避免来回奔波。",
        category: "attraction",
        status: "pending",
        order: 5,
        cityId: "tianjin"
      },
      {
        id: "sample-16",
        name: "补漏晚餐：新利锅巴菜",
        lat: 39.1514,
        lng: 117.2335,
        description: "优先补前面漏掉的店，可在新利锅巴菜、荣真斋、同庆德、桥园里和姚记中就近选择。",
        day: 4,
        date: "2026-10-05",
        time: "18:30",
        duration: 75,
        transport: { mode: "taxi", duration: 25 },
        note: "以酒店周边为主，吃完早点回去收拾行李。",
        category: "restaurant",
        status: "pending",
        order: 6,
        cityId: "tianjin"
      },
      {
        id: "sample-17",
        name: "回酒店收拾行李",
        lat: 39.1567417,
        lng: 117.2311227,
        description: "整理行李、给设备充电，并把 10 月 6 日去车站的时间确认一次。",
        day: 4,
        date: "2026-10-05",
        time: "20:30",
        duration: 60,
        transport: { mode: "walk", duration: 12 },
        note: "早点休息，不再安排夜间活动。",
        category: "hotel",
        status: "pending",
        order: 7,
        cityId: "tianjin"
      },
      {
        id: "sample-18",
        name: "酒店周边天津早餐",
        lat: 39.1538,
        lng: 117.2348,
        description: "退房前吃新利锅巴菜、煎饼果子、大饼夹卷圈、糖果子和中栗华馒头。",
        day: 5,
        date: "2026-10-06",
        time: "07:30",
        duration: 60,
        transport: { mode: "walk", duration: 10 },
        note: "只吃最想吃的一到两样，不要把退房时间卡得太紧。",
        category: "restaurant",
        status: "pending",
        order: 1,
        cityId: "tianjin"
      },
      {
        id: "sample-19",
        name: "回酒店整理行李",
        lat: 39.1567417,
        lng: 117.2311227,
        description: "早餐后回酒店检查房间、充电器、证件和随身物品。",
        day: 5,
        date: "2026-10-06",
        time: "09:30",
        duration: 30,
        transport: { mode: "walk", duration: 12 },
        note: "再次核对车站、车次和导航时间。",
        category: "hotel",
        status: "pending",
        order: 2,
        cityId: "tianjin"
      },
      {
        id: "sample-20",
        name: "退房",
        lat: 39.1567417,
        lng: 117.2311227,
        description: "办理退房并寄存或携带全部行李。",
        day: 5,
        date: "2026-10-06",
        time: "10:00",
        duration: 30,
        transport: { mode: "taxi", duration: 50 },
        note: "若中午12点左右离开，建议10:00前完成退房；13点左右离开可10:30前退房。",
        category: "hotel",
        status: "pending",
        order: 3,
        cityId: "tianjin"
      },
      {
        id: "sample-21",
        name: "出发去车站或机场",
        lat: 39.1363,
        lng: 117.2108,
        description: "预留交通、安检和进站时间，不再安排任何景点。",
        day: 5,
        date: "2026-10-06",
        time: "10:30",
        duration: 45,
        transport: { mode: "taxi", duration: 50 },
        note: "12点左右的车建议更早出发；13点左右的车，10:30—11:00出发较稳。",
        category: "transport",
        status: "pending",
        order: 4,
        cityId: "tianjin"
      }
    ],
    weatherCache: {}
  };

  const EMPTY_STATE = {
    version: APP_VERSION,
    updatedAt: Date.now(),
    trip: {
      name: "我的旅行",
      startDate: "",
      endDate: "",
      dayCities: {},
      cities: []
    },
    settings: clone(SAMPLE_STATE.settings),
    activities: [],
    weatherCache: {}
  };

  const IS_LOCAL_PREVIEW =
    ["localhost", "127.0.0.1", "::1"].includes(location.hostname) ||
    /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname) ||
    location.hostname.endsWith(".local");

  let state = loadState();
  let activeTab = "today";
  let openDays = new Set();
  let map = null;
  let mapLayers = null;
  let mapDay = "all";
  let selectedActivityId = null;
  let pendingLocationActivityId = null;
  let userLocationMarker = null;
  let toastTimer = null;
  let cloudTimer = null;
  let suppressCloudPush = false;

  const app = document.getElementById("app");
  const topbar = document.getElementById("topbar");
  const view = document.getElementById("view");
  const bottomSheet = document.getElementById("bottomSheet");
  const sheetBackdrop = document.getElementById("sheetBackdrop");
  const toast = document.getElementById("toast");
  const confirmDialog = document.getElementById("confirmDialog");

  init();

  function init() {
    const coordinatesToRepair = mergeDefaults();
    const initialTab = location.hash.replace("#", "");
    if (["today", "itinerary", "map", "settings"].includes(initialTab)) {
      activeTab = initialTab;
    }
    applyTheme();
    bindGlobalEvents();
    render();
    coordinatesToRepair.forEach((id) => {
      const activity = state.activities.find((item) => item.id === id);
      if (activity) geocodeActivity(id, activity.name, activity.cityId);
    });
    registerServiceWorker();
    setupCloudPolling();
    refreshWeatherInBackground();
  }

  function mergeDefaults() {
    const previousVersion = Number(state.version || 1);
    const defaultState = IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE;
    const coordinatesToRepair = [];
    state = deepMerge(clone(defaultState), state || {});
    if (!Array.isArray(state.activities)) state.activities = [];
    if (!Array.isArray(state.trip.cities)) state.trip.cities = clone(SAMPLE_STATE.trip.cities);
    if (!state.trip.dayCities || typeof state.trip.dayCities !== "object") {
      state.trip.dayCities = {};
    }
    state.trip.name = cleanImportedText(state.trip.name, 120) || "我的旅行";
    state.trip.startDate = normalizeImportedDate(state.trip.startDate) || "";
    state.trip.endDate = normalizeImportedDate(state.trip.endDate) || "";
    if (state.trip.startDate && state.trip.endDate && state.trip.endDate < state.trip.startDate) {
      state.trip.endDate = state.trip.startDate;
    }

    const cityIdMap = new Map();
    const usedCityIds = new Set();
    state.trip.cities = state.trip.cities
      .filter((city) => city && typeof city === "object")
      .slice(0, 50)
      .map((city) => {
        const oldId = typeof city.id === "string" ? city.id : "";
        let id = isSafeEntityId(oldId) && !usedCityIds.has(oldId) ? oldId : uid();
        while (usedCityIds.has(id)) id = uid();
        usedCityIds.add(id);
        if (oldId) cityIdMap.set(oldId, id);
        city.id = id;
        city.name = cleanImportedText(city.name, 80) || "未命名城市";
        city.lat = parseCoordinate(city.lat);
        city.lng = parseCoordinate(city.lng);
        return city;
      });

    const safeDayCities = {};
    Object.entries(state.trip.dayCities).forEach(([date, cityId]) => {
      const safeDate = normalizeImportedDate(date);
      const safeCityId = cityIdMap.get(String(cityId));
      if (safeDate && safeCityId) safeDayCities[safeDate] = safeCityId;
    });
    state.trip.dayCities = safeDayCities;

    const usedActivityIds = new Set();
    state.activities = state.activities
      .filter((activity) => activity && typeof activity === "object")
      .slice(0, 1000)
      .map((activity, index) => {
        let id = isSafeEntityId(activity.id) && !usedActivityIds.has(activity.id)
          ? activity.id
          : uid();
        while (usedActivityIds.has(id)) id = uid();
        usedActivityIds.add(id);
        activity.id = id;
        activity.date = normalizeImportedDate(activity.date) || state.trip.startDate || "";
        activity.cityId = cityIdMap.get(String(activity.cityId)) || state.trip.cities[0]?.id || "";
        activity.name = cleanImportedText(activity.name, 200) || `活动 ${index + 1}`;
        activity.description = cleanImportedText(activity.description, 2000);
        activity.note = cleanImportedText(activity.note, 1000);
        activity.time = normalizeImportedTime(activity.time);
        activity.category = Object.prototype.hasOwnProperty.call(CATEGORY, activity.category)
          ? activity.category
          : "attraction";
        activity.status = ["pending", "done", "skipped"].includes(activity.status)
          ? activity.status
          : "pending";
        activity.order = Number.isFinite(activity.order) ? activity.order : index + 1;
        if (!activity.transport || typeof activity.transport !== "object") {
          activity.transport = { mode: "walk", duration: 15 };
        }
        activity.transport.mode = Object.prototype.hasOwnProperty.call(
          TRANSPORT,
          activity.transport.mode
        )
          ? activity.transport.mode
          : "walk";
        activity.duration = Number(activity.duration) || 60;
        activity.transport.duration = Math.max(0, Number(activity.transport.duration) || 0);
        const parseStoredCoordinate = (value) =>
          value === null || value === undefined || String(value).trim() === ""
            ? null
            : Number(value);
        activity.lat = parseStoredCoordinate(activity.lat);
        activity.lng = parseStoredCoordinate(activity.lng);
        if (
          !Number.isFinite(activity.lat) ||
          !Number.isFinite(activity.lng) ||
          Math.abs(activity.lat) > 90 ||
          Math.abs(activity.lng) > 180
        ) {
          activity.lat = null;
          activity.lng = null;
        } else if (activity.lat === 0 && activity.lng === 0) {
          activity.lat = null;
          activity.lng = null;
          coordinatesToRepair.push(activity.id);
        }
        return activity;
      });
    if (previousVersion < APP_VERSION) migrateOldDemoState(previousVersion);
    state.version = APP_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return coordinatesToRepair;
  }

  function migrateOldDemoState(previousVersion) {
    if (state.importedAt) return;
    const isTianjinSample =
      state.trip?.startDate === "2026-10-02" &&
      state.activities.some((activity) => String(activity.id).startsWith("sample-"));
    if (previousVersion < 2 && IS_LOCAL_PREVIEW && isTianjinSample) {
      if (state.trip.endDate < "2026-10-06") state.trip.endDate = "2026-10-06";
      if (state.trip.name === "天津三日慢游") state.trip.name = "天津国庆五日慢游";

      const existingIds = new Set(state.activities.map((activity) => activity.id));
      SAMPLE_STATE.activities
        .filter((activity) => Number(activity.day) >= 4)
        .forEach((activity) => {
          if (!existingIds.has(activity.id)) state.activities.push(clone(activity));
        });
    }

    if (!IS_LOCAL_PREVIEW && previousVersion < 3 && isTianjinSample) {
      state.activities = state.activities.filter(
        (activity) => !String(activity.id).startsWith("sample-")
      );
      if (!state.activities.length) {
        state.trip = clone(EMPTY_STATE.trip);
        state.weatherCache = {};
      }
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : clone(IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE);
    } catch (error) {
      console.warn("读取本地数据失败", error);
      return clone(IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE);
    }
  }

  function persist(options = {}) {
    state.updatedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(
      `${STORAGE_KEY}-meta`,
      JSON.stringify({ savedAt: new Date().toISOString(), activities: state.activities.length })
    );
    if (!options.skipRender) render();
    if (!options.skipCloud && state.settings.supabase.enabled) scheduleCloudPush();
  }

  function updateState(mutator, options = {}) {
    suppressCloudPush = Boolean(options.skipCloud);
    mutator(state);
    persist(options);
    suppressCloudPush = false;
  }

  function bindGlobalEvents() {
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", () => switchTab(button.dataset.tab));
    });

    topbar.addEventListener("click", handleViewClick);
    view.addEventListener("click", handleViewClick);
    sheetBackdrop.addEventListener("click", closeSheet);
    window.addEventListener("hashchange", () => {
      const tab = location.hash.replace("#", "");
      if (["today", "itinerary", "map", "settings"].includes(tab) && tab !== activeTab) {
        switchTab(tab, false);
      }
    });

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    systemTheme.addEventListener?.("change", () => {
      if (state.settings.theme === "system") applyTheme();
    });
  }

  function switchTab(tab, updateHash = true) {
    activeTab = tab;
    if (updateHash) history.replaceState(null, "", `#${tab}`);
    selectedActivityId = null;
    render();
  }

  function render() {
    applyTheme();
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === activeTab);
    });
    renderTopbar();
    if (activeTab === "today") renderToday();
    if (activeTab === "itinerary") renderItinerary();
    if (activeTab === "map") renderMapView();
    if (activeTab === "settings") renderSettings();
    refreshIcons();
  }

  function renderTopbar() {
    const city = citiesForVisibleDates()[0]?.name || "旅行";
    if (activeTab === "map") {
      topbar.innerHTML = `
        <div>
          <h1>${escapeHtml(state.trip.name)}</h1>
          <p>地图 · ${escapeHtml(city)}</p>
        </div>
        <button class="button ghost small" type="button" data-action="switch-tab" data-tab="today">
          <i data-lucide="sun-medium"></i>今天
        </button>
      `;
      return;
    }
    topbar.innerHTML = `
      <div>
        <h1>${escapeHtml(state.trip.name)}</h1>
        <p>${escapeHtml(formatDateRange())}</p>
      </div>
      <button class="button ghost small" type="button" data-action="refresh-weather" aria-label="刷新天气">
        <i data-lucide="refresh-cw"></i>天气
      </button>
    `;
  }

  function renderToday() {
    if (!tripDates().length) {
      renderEmptyToday();
      return;
    }
    const today = getTodayDate();
    const day = dayNumberForDate(today);
    const activities = activitiesForDate(today);
    const city = cityForDate(today);
    const weather = weatherForDate(today, city);
    const inTrip = isDateWithinTrip(realTodayString());
    const weatherVisual = weatherVisualFor(weather);

    view.className = "view";
    view.innerHTML = `
      <div class="section-stack">
        <section class="hero-card">
          <p class="hero-date">${escapeHtml(formatFullDate(today))} · Day ${day}${inTrip ? "" : " · 预演"}</p>
          <div class="hero-city-row">
            <h2 class="hero-title">${escapeHtml(city?.name || "目的地")}</h2>
            <button
              class="hero-city-button"
              type="button"
              data-action="switch-city"
              data-date="${today}"
              aria-label="${city ? "更换今日城市" : "添加今日城市"}"
            >
              <i data-lucide="${city ? "pencil-line" : "plus"}"></i>
              <span>${city ? "换城市" : "添加城市"}</span>
            </button>
          </div>
          <div class="weather-row">
            <div class="weather-icon"><i data-lucide="${weatherVisual.icon}"></i></div>
            <div class="weather-copy">
              <strong>${escapeHtml(weatherVisual.label)}</strong>
              <span>${weather ? `${Math.round(weather.min)}° / ${Math.round(weather.max)}° · 降水 ${weather.precipitation}%` : "天气加载中，可稍后刷新"}</span>
            </div>
          </div>
        </section>

        ${
          inTrip
            ? ""
            : `<div class="status-line"><strong>行程还没开始。</strong> 现在展示的是 Day ${day}，便于提前检查和修改。</div>`
        }

        <div class="section-heading">
          <div>
            <h2>今日安排</h2>
            <p>${activities.length} 个活动 · 左右滑动卡片可完成或跳过</p>
          </div>
          <button class="button soft small" type="button" data-action="switch-tab" data-tab="map">
            <i data-lucide="map"></i>地图
          </button>
        </div>

        <div class="activity-list">
          ${
            activities.length
              ? activities.map((activity) => renderTodayCard(activity)).join("")
              : renderEmpty("今天还没有安排", "calendar-plus")
          }
        </div>
      </div>
      <button class="fab" type="button" data-action="quick-add" data-date="${today}">
        <i data-lucide="plus"></i>加一个地方
      </button>
    `;
    bindTodaySwipe();
  }

  function renderEmptyToday() {
    view.className = "view";
    view.innerHTML = `
      <div class="section-stack">
        <section class="hero-card">
          <p class="hero-date">准备开始</p>
          <h2 class="hero-title">${escapeHtml(state.trip.name || "我的旅行")}</h2>
          <div class="weather-row">
            <div class="weather-icon"><i data-lucide="map-pinned"></i></div>
            <div class="weather-copy">
              <strong>还没有旅行日期</strong>
              <span>设置日期和城市后，就可以开始添加地点。</span>
            </div>
          </div>
        </section>
        <div class="panel">
          ${renderEmpty("先建立一份空白行程", "calendar-plus")}
          <div style="padding:0 16px 18px">
            <button class="button primary" style="width:100%" type="button" data-action="start-trip">
              <i data-lucide="wand-sparkles"></i>设置日期和城市
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderTodayCard(activity) {
    const transport = TRANSPORT[activity.transport?.mode || "walk"];
    const statusClass = `status-${activity.status || "pending"}`;
    return `
      <article class="activity-card ${statusClass}" data-activity-id="${activity.id}" tabindex="0">
        <button class="activity-time" type="button" data-action="toggle-status" data-id="${activity.id}" aria-label="切换完成状态">
          ${escapeHtml(activity.time || "--:--")}
        </button>
        <div class="activity-main" data-action="edit-activity" data-id="${activity.id}">
          <div class="activity-title-row">
            <h3 class="activity-title">${escapeHtml(activity.name)}</h3>
          </div>
          <p class="activity-note">${escapeHtml(activity.note || activity.description || "还没有备注")}</p>
          <div class="chips">
            <span class="chip">
              <i data-lucide="${CATEGORY[activity.category]?.icon || "map-pin"}"></i>
              ${escapeHtml(CATEGORY[activity.category]?.label || "地点")}
            </span>
            ${
              transport
                ? `<span class="chip transport"><i data-lucide="${transport.icon}"></i>${escapeHtml(transport.label)} ${Number(activity.transport?.duration) || 0}分</span>`
                : ""
            }
            <span class="chip"><i data-lucide="timer"></i>${Number(activity.duration) || 60}分</span>
          </div>
        </div>
        <div class="card-side">
          <button class="nav-round" type="button" data-action="navigate" data-id="${activity.id}" aria-label="导航">
            <i data-lucide="navigation"></i>
          </button>
        </div>
      </article>
    `;
  }

  function renderItinerary() {
    const dates = tripDates();
    const today = getTodayDate();
    view.className = "view";
    view.innerHTML = `
      <div class="section-stack">
        <div class="section-heading">
          <div>
            <h2>全部行程</h2>
            <p>拖拽排序 · 左滑删除 · 点击编辑</p>
          </div>
          <div class="inline-actions">
            <button class="button ghost small" type="button" data-action="${dates.length ? "add-day" : "start-trip"}">
              <i data-lucide="${dates.length ? "calendar-plus" : "wand-sparkles"}"></i>${dates.length ? "加一天" : "开始设置"}
            </button>
            ${
              dates.length > 1
                ? `<button class="button ghost small" type="button" data-action="remove-day">
                    <i data-lucide="calendar-minus"></i>减一天
                  </button>`
                : ""
            }
            <button class="button primary small" type="button" data-action="add-activity">
              <i data-lucide="plus"></i>加活动
            </button>
          </div>
        </div>
        <div class="field">
          <label for="itinerarySearch">搜索活动</label>
          <input id="itinerarySearch" type="search" placeholder="按地点、备注或类别查找" autocomplete="off" />
        </div>
        ${
          dates.length
            ? dates
                .map((date, index) => {
                  const day = index + 1;
                  const activities = activitiesForDate(date);
                  const city = cityForDate(date);
                  const weather = weatherForDate(date, city);
                  const weatherVisual = weatherVisualFor(weather);
                  const isToday = date === today;
                  const isOpen = openDays.has(date) || isToday;
                  return `
                    <details class="day-card" data-day="${date}" ${isOpen ? "open" : ""}>
                      <summary class="day-summary">
                        <div>
                          <h3>Day ${day} · ${escapeHtml(formatShortDate(date))}</h3>
                          <p>${escapeHtml(city?.name || "未设置城市")} · ${activities.length} 个活动</p>
                        </div>
                        <div class="day-weather">
                          <i data-lucide="${weatherVisual.icon}"></i>
                          ${weather ? `${Math.round(weather.min)}°/${Math.round(weather.max)}°` : "--"}
                        </div>
                      </summary>
                      <div class="day-body">
                        ${
                          activities.length
                            ? activities.map((activity) => renderItineraryRow(activity)).join("")
                            : renderEmpty("这一天还没有活动", "circle-dashed")
                        }
                        <button class="button ghost" type="button" data-action="quick-add" data-date="${date}">
                          <i data-lucide="plus"></i>添加到 Day ${day}
                        </button>
                      </div>
                    </details>
                  `;
                })
                .join("")
            : `
              <div class="panel">
                ${renderEmpty("还没有行程，先设置日期和城市", "calendar-plus")}
                <div style="padding:0 16px 18px">
                  <button class="button primary" style="width:100%" type="button" data-action="start-trip">
                    <i data-lucide="wand-sparkles"></i>建立我的行程
                  </button>
                </div>
              </div>
            `
        }
      </div>
    `;

    view.querySelectorAll("details.day-card").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (detail.open) openDays.add(detail.dataset.day);
        else openDays.delete(detail.dataset.day);
      });
    });
    bindItineraryInteractions();
    bindItinerarySearch();
  }

  function bindItinerarySearch() {
    const input = view.querySelector("#itinerarySearch");
    if (!input) return;
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      view.querySelectorAll(".day-card").forEach((dayCard) => {
        let visibleCount = 0;
        dayCard.querySelectorAll(".activity-row").forEach((row) => {
          const visible = !query || row.textContent.toLowerCase().includes(query);
          row.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        dayCard.hidden = Boolean(query) && visibleCount === 0;
      });
    });
  }

  function renderItineraryRow(activity) {
    const transport = TRANSPORT[activity.transport?.mode || "walk"];
    return `
      <article class="activity-row" data-activity-id="${activity.id}">
        <button class="drag-handle" type="button" data-action="drag-handle" aria-label="拖拽排序">
          <i data-lucide="grip-vertical"></i>
        </button>
        <div class="activity-row-copy" data-action="edit-activity" data-id="${activity.id}">
          <strong>${escapeHtml(activity.name)}</strong>
          <span>${escapeHtml(activity.time || "--:--")} · ${escapeHtml(CATEGORY[activity.category]?.label || "地点")} · ${escapeHtml(transport?.label || "交通")} ${Number(activity.transport?.duration) || 0}分</span>
        </div>
        <div class="row-actions">
          <button class="mini-button" type="button" data-action="show-map" data-id="${activity.id}" aria-label="在地图中查看">
            <i data-lucide="map-pin"></i>
          </button>
          <button class="mini-button danger" type="button" data-action="delete-activity" data-id="${activity.id}" aria-label="删除">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </article>
    `;
  }

  function renderMapView() {
    const dates = tripDates();
    if (map) {
      map.remove();
      map = null;
      mapLayers = null;
      selectedActivityId = null;
      pendingLocationActivityId = null;
      userLocationMarker = null;
    }
    view.className = "view map-view";
    view.innerHTML = `
      <div class="map-frame">
        <div id="map"></div>
        <div class="map-top">
          <form class="map-search" data-form="map-search">
            <input id="mapSearchInput" type="search" placeholder="搜索地名，例如：五大道" autocomplete="off" />
            <button type="submit" aria-label="搜索"><i data-lucide="search"></i></button>
          </form>
          <div id="searchResults"></div>
          <div class="day-strip">
            <button class="day-pill ${mapDay === "all" ? "active" : ""}" type="button" data-action="map-day" data-day="all">
              <span class="color-dot" style="--day-color:#334155"></span>全部
            </button>
            ${dates
              .map((date, index) => {
                const day = index + 1;
                return `
                  <button class="day-pill ${mapDay === date ? "active" : ""}" type="button" data-action="map-day" data-day="${date}">
                    <span class="color-dot" style="--day-color:${dayColor(day)}"></span>Day ${day}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
        <div class="map-fabs">
          <button class="map-fab" type="button" data-action="locate-me" aria-label="定位到我">
            <i data-lucide="locate-fixed"></i>
          </button>
          <button class="map-fab" type="button" data-action="show-all-map" aria-label="显示全部天">
            <i data-lucide="layers-3"></i>
          </button>
          <button class="map-fab primary" type="button" data-action="map-add-place" aria-label="添加地点">
            <i data-lucide="plus"></i>
          </button>
        </div>
        <div id="mapCard"></div>
      </div>
    `;
    requestAnimationFrame(() => initializeMap());
  }

  function renderMapCard() {
    const target = document.getElementById("mapCard");
    if (!target) return;
    const activity = state.activities.find((item) => item.id === selectedActivityId);
    if (!activity) {
      target.innerHTML = "";
      return;
    }
    const day = dayNumberForDate(activity.date) || activity.day || 1;
    const today = getTodayDate();
    const hasLocation = Number.isFinite(activity.lat) && Number.isFinite(activity.lng);
    target.innerHTML = `
      <article class="map-card">
        <div class="map-card-head">
          <div>
            <h3>${escapeHtml(activity.name)}</h3>
            <div class="chips" style="margin-top:8px">
              <span class="chip"><i data-lucide="calendar-days"></i>Day ${day}</span>
              <span class="chip"><i data-lucide="clock-3"></i>${escapeHtml(activity.time || "--:--")}</span>
              <span class="chip"><i data-lucide="timer"></i>${Number(activity.duration) || 60}分</span>
            </div>
          </div>
          <button class="mini-button" type="button" data-action="close-map-card" aria-label="关闭">
            <i data-lucide="x"></i>
          </button>
        </div>
        <p>${escapeHtml(activity.description || "还没有简介。")}</p>
        <div class="map-card-actions">
          ${
            hasLocation
              ? `<button class="button primary small" type="button" data-action="navigate" data-id="${activity.id}">
                  <i data-lucide="navigation"></i>导航到这里
                </button>`
              : `<button class="button primary small" type="button" data-action="place-on-map" data-id="${activity.id}">
                  <i data-lucide="map-pin-plus"></i>在地图上补位置
                </button>`
          }
          <button class="button ghost small" type="button" data-action="edit-activity" data-id="${activity.id}">
            <i data-lucide="pencil"></i>编辑
          </button>
          <button class="button ghost small" type="button" data-action="move-to-day" data-id="${activity.id}">
            <i data-lucide="calendar-range"></i>移到其他天
          </button>
          <button class="button soft small" type="button" data-action="add-to-today" data-id="${activity.id}" ${activity.date === today ? "disabled" : ""}>
            <i data-lucide="sun-medium"></i>${activity.date === today ? "已在今天" : "加入今天"}
          </button>
          <button class="button danger small" type="button" data-action="delete-activity" data-id="${activity.id}">
            <i data-lucide="trash-2"></i>删除
          </button>
        </div>
      </article>
    `;
    refreshIcons(target);
  }

  function renderSettings() {
    const settings = state.settings;
    view.className = "view";
    view.innerHTML = `
      <div class="section-stack">
        <section class="settings-group">
          <h2><i data-lucide="route"></i>行程基础信息</h2>
          <div class="field-grid">
            <div class="field">
              <label for="tripName">行程名称</label>
              <input id="tripName" data-setting="trip.name" value="${escapeAttribute(state.trip.name)}" />
            </div>
            <div class="field-grid two">
              <div class="field">
                <label for="startDate">开始日期</label>
                <input id="startDate" type="date" data-setting="trip.startDate" value="${state.trip.startDate}" />
              </div>
              <div class="field">
                <label for="endDate">结束日期</label>
                <input id="endDate" type="date" data-setting="trip.endDate" value="${state.trip.endDate}" />
              </div>
            </div>
          </div>
          <div class="section-heading">
            <div>
              <h3><i data-lucide="building-2"></i>城市与天气</h3>
              <p>Open-Meteo 使用城市经纬度查询未来天气</p>
            </div>
            <button class="button ghost small" type="button" data-action="add-city"><i data-lucide="plus"></i>城市</button>
          </div>
          <div class="field-grid">
            ${
              state.trip.cities.length
                ? state.trip.cities.map((city) => renderCityRow(city)).join("")
                : `<div class="status-line">还没有城市，天气和地图默认中心将不可用。</div>`
            }
          </div>
          <button class="button soft" type="button" data-action="refresh-weather">
            <i data-lucide="cloud-sun"></i>刷新天气
          </button>
        </section>

        <section class="settings-group">
          <h2><i data-lucide="palette"></i>显示主题</h2>
          <div class="segmented" data-setting="theme">
            <button class="segment ${settings.theme === "light" ? "active" : ""}" type="button" data-action="set-theme" data-theme="light">浅色</button>
            <button class="segment ${settings.theme === "dark" ? "active" : ""}" type="button" data-action="set-theme" data-theme="dark">深色</button>
            <button class="segment ${settings.theme === "system" ? "active" : ""}" type="button" data-action="set-theme" data-theme="system">跟随系统</button>
          </div>
        </section>

        <section class="settings-group">
          <h2><i data-lucide="cloud-cog"></i>Supabase 云同步</h2>
          <div class="switch-row">
            <div>
              <strong>启用云同步</strong>
              <span>基础轮询同步，适合多人查看和编辑同一份行程</span>
            </div>
            <label class="switch">
              <input type="checkbox" data-setting="settings.supabase.enabled" ${settings.supabase.enabled ? "checked" : ""} />
              <span></span>
            </label>
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="supabaseUrl">Supabase URL</label>
              <input id="supabaseUrl" data-setting="settings.supabase.url" value="${escapeAttribute(settings.supabase.url)}" placeholder="https://xxxx.supabase.co" />
            </div>
            <div class="field">
              <label for="supabaseKey">Anon Key</label>
              <input id="supabaseKey" data-setting="settings.supabase.anonKey" value="${escapeAttribute(settings.supabase.anonKey)}" placeholder="eyJ..." />
            </div>
            <div class="field">
              <label for="supabaseTripId">行程 ID</label>
              <input id="supabaseTripId" data-setting="settings.supabase.tripId" value="${escapeAttribute(settings.supabase.tripId)}" />
            </div>
            <div class="field">
              <label for="supabaseSecret">行程共享密钥</label>
              <input id="supabaseSecret" data-setting="settings.supabase.secret" value="${escapeAttribute(settings.supabase.secret || "")}" placeholder="至少 16 位；与同行成员分享" autocomplete="off" />
            </div>
          </div>
          <div class="inline-actions">
            <button class="button soft" type="button" data-action="generate-supabase-secret"><i data-lucide="key-round"></i>生成密钥</button>
            <button class="button primary" type="button" data-action="cloud-push"><i data-lucide="cloud-upload"></i>上传</button>
            <button class="button ghost" type="button" data-action="cloud-pull"><i data-lucide="cloud-download"></i>拉取</button>
          </div>
          <div class="status-line" id="cloudStatus">${escapeHtml(cloudStatusText())}</div>
        </section>

        <section class="settings-group">
          <h2><i data-lucide="map-pinned"></i>国内地点搜索（可选）</h2>
          <div class="status-line">
            默认使用 OpenStreetMap。国内门店较多时，可填写高德地图 Web 端 Key 和securityJsCode，搜索会优先使用高德。
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="amapKey">高德 Web 端 Key</label>
              <input id="amapKey" data-setting="settings.amap.key" value="${escapeAttribute(settings.amap?.key || "")}" placeholder="可选" />
            </div>
            <div class="field">
              <label for="amapSecurityCode">高德 securityJsCode</label>
              <input id="amapSecurityCode" type="password" data-setting="settings.amap.securityCode" value="${escapeAttribute(settings.amap?.securityCode || "")}" placeholder="可选" />
            </div>
          </div>
        </section>

        <section class="settings-group">
          <h2><i data-lucide="sparkles"></i>AI 写简介</h2>
          <div class="field-grid">
            <div class="field">
              <label for="aiBaseUrl">兼容 OpenAI 的 Base URL</label>
              <input id="aiBaseUrl" data-setting="settings.ai.baseUrl" value="${escapeAttribute(settings.ai.baseUrl)}" />
            </div>
            <div class="field">
              <label for="aiModel">模型名</label>
              <input id="aiModel" data-setting="settings.ai.model" value="${escapeAttribute(settings.ai.model)}" />
            </div>
            <div class="field">
              <label for="aiApiKey">API Key</label>
              <input id="aiApiKey" type="password" data-setting="settings.ai.apiKey" value="${escapeAttribute(settings.ai.apiKey)}" placeholder="仅保存在本地或云同步数据中" />
            </div>
            <div class="field">
              <label for="orsKey">OpenRouteService Key（可选）</label>
              <input id="orsKey" data-setting="settings.orsKey" value="${escapeAttribute(settings.orsKey)}" placeholder="没有时使用直线距离估算" />
            </div>
          </div>
        </section>

        <section class="settings-group">
          <h2><i data-lucide="database"></i>数据管理</h2>
          <div class="inline-actions">
            <button class="button primary" type="button" data-action="export-data"><i data-lucide="download"></i>导出 JSON</button>
            <button class="button ghost" type="button" data-action="import-data"><i data-lucide="upload"></i>导入 JSON</button>
            <button class="button ghost" type="button" data-action="reset-trip"><i data-lucide="rotate-ccw"></i>${IS_LOCAL_PREVIEW ? "恢复天津示例" : "清空行程"}</button>
            <button class="button ghost" type="button" data-action="force-app-update"><i data-lucide="refresh-cw"></i>刷新应用缓存</button>
          </div>
          <input id="importFile" type="file" accept="application/json,.json" hidden />
          <div class="status-line">
            本地数据保存在浏览器 localStorage。应用版本 v${APP_VERSION}。离线时可以查看和编辑，重新联网后同步天气与地图底图。
          </div>
        </section>
      </div>
    `;
    bindSettingsEvents();
  }

  function renderCityRow(city) {
    const activityCount = state.activities.filter((activity) => activity.cityId === city.id).length;
    return `
      <div class="city-row" data-city-id="${city.id}">
        <div>
          <strong>${escapeHtml(city.name)}</strong>
          <span>${Number(city.lat).toFixed(4)}, ${Number(city.lng).toFixed(4)} · ${activityCount} 个活动</span>
        </div>
        <div class="row-actions">
          <button class="mini-button" type="button" data-action="edit-city" data-id="${city.id}" aria-label="编辑城市">
            <i data-lucide="pencil"></i>
          </button>
          <button class="mini-button danger" type="button" data-action="delete-city" data-id="${city.id}" aria-label="删除城市">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;
  }

  function renderEmpty(text, icon = "map-pin") {
    return `
      <div class="empty-state">
        <div><i data-lucide="${icon}"></i><div>${escapeHtml(text)}</div></div>
      </div>
    `;
  }

  function handleViewClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === "switch-tab") switchTab(button.dataset.tab);
    if (action === "start-trip") openTripSetupSheet();
    if (action === "switch-city") openCitySwitcher(button.dataset.date);
    if (action === "refresh-weather") refreshWeather(true);
    if (action === "quick-add") {
      if (!tripDates().length) openTripSetupSheet();
      else openActivitySheet(null, { date: button.dataset.date });
    }
    if (action === "add-activity") {
      if (!tripDates().length) openTripSetupSheet();
      else openActivitySheet(null, { date: getTodayDate() });
    }
    if (action === "edit-activity") openActivitySheet(id);
    if (action === "toggle-status") toggleActivityStatus(id);
    if (action === "navigate") navigateToActivity(id);
    if (action === "delete-activity") deleteActivity(id);
    if (action === "show-map") showOnMap(id);
    if (action === "place-on-map") {
      pendingLocationActivityId = id;
      selectedActivityId = null;
      document.getElementById("map")?.classList.add("picking-location");
      renderMapCard();
      toastMessage("请点击地图上的实际位置");
    }
    if (action === "add-day") addDay();
    if (action === "remove-day") removeLastDay();
    if (action === "map-day") setMapDay(button.dataset.day);
    if (action === "locate-me") locateUser();
    if (action === "show-all-map") setMapDay("all");
    if (action === "map-add-place") {
      if (!tripDates().length) openTripSetupSheet();
      else openActivitySheet(null, { date: mapDay === "all" ? getTodayDate() : mapDay });
    }
    if (action === "close-map-card") {
      selectedActivityId = null;
      renderMapCard();
    }
    if (action === "move-to-day") moveActivityToDay(id);
    if (action === "add-to-today") moveActivityToDate(id, getTodayDate());
    if (action === "set-theme") setTheme(button.dataset.theme);
    if (action === "add-city") openCitySheet();
    if (action === "edit-city") openCitySheet(id);
    if (action === "delete-city") deleteCity(id);
    if (action === "generate-supabase-secret") generateSupabaseSecret();
    if (action === "cloud-push") cloudPush(true);
    if (action === "cloud-pull") cloudPull(true);
    if (action === "export-data") exportData();
    if (action === "import-data") document.getElementById("importFile")?.click();
    if (action === "reset-trip") resetTrip();
    if (action === "force-app-update") forceAppUpdate();
  }

  function refreshIcons(root = document) {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons({
        attrs: { "stroke-width": 2.1 },
        nameAttr: "data-lucide"
      });
    }
  }

  function setTheme(theme) {
    state.settings.theme = theme;
    persist({ skipCloud: true });
  }

  function applyTheme() {
    const mode = state.settings.theme;
    const dark =
      mode === "dark" ||
      (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0f1918" : "#0f766e");
  }

  function getTodayDate() {
    const today = realTodayString();
    const dates = tripDates();
    if (dates.includes(today)) return today;
    return dates[0] || today;
  }

  function realTodayString() {
    return toDateString(new Date());
  }

  function isDateWithinTrip(date) {
    return tripDates().includes(date);
  }

  function tripDates() {
    const start = parseDate(state.trip.startDate);
    const end = parseDate(state.trip.endDate);
    if (!start || !end || end < start) return [];
    const dates = [];
    const cursor = new Date(start);
    let guard = 0;
    while (cursor <= end && guard < 370) {
      dates.push(toDateString(cursor));
      cursor.setDate(cursor.getDate() + 1);
      guard += 1;
    }
    return dates;
  }

  function citiesForVisibleDates() {
    const dates = tripDates();
    const cityIds = new Set(
      state.activities
        .filter((activity) => dates.includes(activity.date))
        .map((activity) => activity.cityId)
        .filter(Boolean)
    );
    const cities = state.trip.cities.filter((city) => cityIds.has(city.id));
    return cities.length ? cities : state.trip.cities;
  }

  function cityForDate(date) {
    const assignedCityId = state.trip.dayCities?.[date];
    const assignedCity = state.trip.cities.find((city) => city.id === assignedCityId);
    if (assignedCity) return assignedCity;
    const activity = activitiesForDate(date).find((item) => item.cityId);
    return (
      state.trip.cities.find((city) => city.id === activity?.cityId) ||
      state.trip.cities[0] ||
      null
    );
  }

  function activitiesForDate(date) {
    return state.activities
      .filter((activity) => activity.date === date)
      .sort(compareActivities);
  }

  function compareActivities(a, b) {
    const aTime = a.time || "99:99";
    const bTime = b.time || "99:99";
    return aTime.localeCompare(bTime) || (a.order || 0) - (b.order || 0);
  }

  function dayNumberForDate(date) {
    const index = tripDates().indexOf(date);
    return index >= 0 ? index + 1 : Number(state.activities.find((item) => item.date === date)?.day) || 1;
  }

  function dateForDay(day) {
    return tripDates()[Math.max(0, Number(day) - 1)] || getTodayDate();
  }

  function formatFullDate(dateString) {
    const date = parseDate(dateString);
    if (!date) return dateString;
    const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekday}`;
  }

  function formatShortDate(dateString) {
    const date = parseDate(dateString);
    if (!date) return dateString;
    const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekday}`;
  }

  function formatDateRange() {
    if (!state.trip.startDate || !state.trip.endDate) return "尚未设置日期";
    return `${state.trip.startDate} 至 ${state.trip.endDate}`;
  }

  function parseDate(dateString) {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day, 12, 0, 0);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function toDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function dayColor(dayNumber) {
    return DAY_COLORS[(Math.max(1, Number(dayNumber)) - 1) % DAY_COLORS.length];
  }

  function weatherVisualFor(weather) {
    if (!weather) return { label: "天气待获取", icon: "cloud-sun" };
    const [label, icon] = WEATHER[weather.code] || ["天气变化", "cloud-sun"];
    return { label, icon };
  }

  function currentWeatherForCity(city) {
    if (!city) return null;
    const currentDate = getTodayDate();
    return weatherForDate(currentDate, city);
  }

  function weatherForDate(date, city) {
    if (!date || !city) return null;
    return state.weatherCache?.[city.id]?.[date] || null;
  }

  function uid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function isSafeEntityId(value) {
    return typeof value === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(value);
  }

  function parseCoordinate(value) {
    if (value === null || value === undefined || String(value).trim() === "") return null;
    const coordinate = Number(value);
    return Number.isFinite(coordinate) ? coordinate : null;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function deepMerge(base, override) {
    if (Array.isArray(base) || Array.isArray(override)) return override ?? base;
    if (typeof base !== "object" || base === null || typeof override !== "object" || override === null) {
      return override ?? base;
    }
    const result = { ...base };
    Object.keys(override).forEach((key) => {
      if (["__proto__", "prototype", "constructor"].includes(key)) return;
      result[key] = deepMerge(base[key], override[key]);
    });
    return result;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#096;");
  }

  function toastMessage(message) {
    toast.hidden = false;
    toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2600);
  }

  function confirmAction(title, message) {
    return new Promise((resolve) => {
      document.getElementById("confirmTitle").textContent = title;
      document.getElementById("confirmMessage").textContent = message;
      confirmDialog.hidden = false;
      const cleanup = () => {
        confirmDialog.hidden = true;
        document.getElementById("confirmOk").onclick = null;
        document.getElementById("confirmCancel").onclick = null;
      };
      document.getElementById("confirmOk").onclick = () => {
        cleanup();
        resolve(true);
      };
      document.getElementById("confirmCancel").onclick = () => {
        cleanup();
        resolve(false);
      };
    });
  }

  function openSheet(title, content, mount) {
    bottomSheet.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <h2>${escapeHtml(title)}</h2>
        <button class="mini-button" type="button" data-sheet-close aria-label="关闭">
          <i data-lucide="x"></i>
        </button>
      </div>
      ${content}
    `;
    bottomSheet.hidden = false;
    sheetBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
    bottomSheet.querySelector("[data-sheet-close]")?.addEventListener("click", closeSheet);
    refreshIcons(bottomSheet);
    mount?.(bottomSheet);
  }

  function closeSheet() {
    bottomSheet.hidden = true;
    sheetBackdrop.hidden = true;
    bottomSheet.innerHTML = "";
    document.body.style.overflow = "";
  }

  function openActivitySheet(id = null, presets = {}) {
    const editing = state.activities.find((activity) => activity.id === id) || null;
    const date = editing?.date || presets.date || getTodayDate();
    const lat = editing?.lat ?? presets.lat ?? "";
    const lng = editing?.lng ?? presets.lng ?? "";
    const time = editing?.time || presets.time || "";
    const name = editing?.name || presets.name || "";
    const description = editing?.description || presets.description || "";
    const note = editing?.note || "";
    const category = editing?.category || presets.category || "attraction";
    const duration = editing?.duration || 60;
    const transport = editing?.transport || { mode: "walk", duration: 15 };
    const cityId = editing?.cityId || cityForDate(date)?.id || state.trip.cities[0]?.id || "";
    const isQuick = !editing && !presets.full;

    openSheet(
      editing ? "编辑活动" : isQuick ? "快速添加" : "添加活动",
      `
        <form class="sheet-form" id="activityForm">
          <div class="field">
            <label for="activityName">地点名称 *</label>
            <input id="activityName" name="name" required value="${escapeAttribute(name)}" placeholder="例如：五大道" />
          </div>
          <div class="field-grid two">
            <div class="field">
              <label for="activityDate">日期</label>
              <input id="activityDate" name="date" type="date" value="${date}" />
            </div>
            <div class="field">
              <label for="activityTime">时间</label>
              <input id="activityTime" name="time" type="time" value="${time}" />
            </div>
          </div>
          <div class="field">
            <label for="activityNote">备注</label>
            <textarea id="activityNote" name="note" placeholder="例如：提前预约、排队时间长">${escapeHtml(note)}</textarea>
          </div>
          ${
            isQuick
              ? ""
              : `
                <div class="field">
                  <label for="activityDescription">简介</label>
                  <textarea id="activityDescription" name="description" placeholder="1—3 句，方便在地图卡片中查看">${escapeHtml(description)}</textarea>
                </div>
                <div class="inline-actions">
                  <button class="button soft" type="button" id="aiDescribe">
                    <i data-lucide="sparkles"></i>AI 写简介
                  </button>
                </div>
                <div class="field-grid two">
                  <div class="field">
                    <label for="activityCategory">类别</label>
                    <select id="activityCategory" name="category">
                      ${Object.entries(CATEGORY)
                        .map(
                          ([value, meta]) =>
                            `<option value="${value}" ${value === category ? "selected" : ""}>${meta.label}</option>`
                        )
                        .join("")}
                    </select>
                  </div>
                  <div class="field">
                    <label for="activityDuration">建议时长（分钟）</label>
                    <input id="activityDuration" name="duration" type="number" min="5" step="5" value="${duration}" />
                  </div>
                </div>
                <div class="field-grid two">
                  <div class="field">
                    <label for="activityLat">纬度</label>
                    <input id="activityLat" name="lat" type="number" step="0.000001" value="${escapeAttribute(lat)}" placeholder="点击地图长按可自动填写" />
                  </div>
                  <div class="field">
                    <label for="activityLng">经度</label>
                    <input id="activityLng" name="lng" type="number" step="0.000001" value="${escapeAttribute(lng)}" placeholder="点击地图长按可自动填写" />
                  </div>
                </div>
                <div class="field-grid two">
                  <div class="field">
                    <label for="activityTransport">到下一站</label>
                    <select id="activityTransport" name="transportMode">
                      ${Object.entries(TRANSPORT)
                        .map(
                          ([value, meta]) =>
                            `<option value="${value}" ${value === transport.mode ? "selected" : ""}>${meta.label}</option>`
                        )
                        .join("")}
                    </select>
                  </div>
                  <div class="field">
                    <label for="transportDuration">预计耗时（分钟）</label>
                    <input id="transportDuration" name="transportDuration" type="number" min="0" step="1" value="${transport.duration || 15}" />
                  </div>
                </div>
                <div class="inline-actions">
                  <button class="button ghost" type="button" id="estimateTransport">
                    <i data-lucide="route"></i>估算到下一站
                  </button>
                </div>
              `
          }
          <input type="hidden" name="cityId" value="${escapeAttribute(cityId)}" />
          <div class="sheet-actions">
            <button class="button ghost" type="button" id="expandQuick">${isQuick ? "更多选项" : "取消"}</button>
            <button class="button primary" type="submit">
              <i data-lucide="check"></i>${editing ? "保存" : "添加"}
            </button>
          </div>
        </form>
      `,
      (sheet) => {
        sheet.querySelector("#activityDate")?.addEventListener("change", (event) => {
          const hiddenCity = sheet.querySelector('input[name="cityId"]');
          const selectedCity = cityForDate(event.currentTarget.value);
          if (hiddenCity && selectedCity) hiddenCity.value = selectedCity.id;
        });
        sheet.querySelector("#expandQuick")?.addEventListener("click", () => {
          if (!isQuick) {
            closeSheet();
            return;
          }
          const values = formValues(sheet.querySelector("#activityForm"));
          closeSheet();
          openActivitySheet(editing?.id || null, { ...presets, ...values, full: true });
        });
        sheet.querySelector("#activityForm")?.addEventListener("submit", (event) => {
          event.preventDefault();
          const values = formValues(event.currentTarget);
          if (!values.name.trim()) return;
          const saved = saveActivityFromForm(values, editing?.id);
          closeSheet();
          if (
            saved &&
            (!Number.isFinite(saved.lat) || !Number.isFinite(saved.lng))
          ) {
            geocodeActivity(saved.id, saved.name, saved.cityId);
          }
        });
        sheet.querySelector("#aiDescribe")?.addEventListener("click", async (event) => {
          const button = event.currentTarget;
          const nameValue = sheet.querySelector("#activityName")?.value.trim();
          if (!nameValue) {
            toastMessage("先填写地点名称");
            return;
          }
          button.disabled = true;
          button.innerHTML = '<i data-lucide="loader-circle"></i>生成中';
          refreshIcons(button);
          try {
            const descriptionValue = await generateDescription(nameValue);
            sheet.querySelector("#activityDescription").value = descriptionValue;
          } catch (error) {
            toastMessage(error.message || "AI 简介生成失败");
          } finally {
            button.disabled = false;
            button.innerHTML = '<i data-lucide="sparkles"></i>AI 写简介';
            refreshIcons(button);
          }
        });
        sheet.querySelector("#estimateTransport")?.addEventListener("click", async () => {
          const values = formValues(sheet.querySelector("#activityForm"));
          const previous = previousActivityForDate(values.date, values.time);
          const duration = await estimateTransportMinutes(
            previous,
            { lat: Number(values.lat), lng: Number(values.lng) },
            values.transportMode
          );
          if (duration) sheet.querySelector("#transportDuration").value = duration;
        });
      }
    );
  }

  function formValues(form) {
    const data = new FormData(form);
    const latValue = data.get("lat");
    const lngValue = data.get("lng");
    const parseCoordinate = (value) =>
      value === null || String(value).trim() === "" ? null : Number(value);
    return {
      name: String(data.get("name") || "").trim(),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      note: String(data.get("note") || "").trim(),
      description: String(data.get("description") || "").trim(),
      category: String(data.get("category") || "attraction"),
      duration: Number(data.get("duration") || 60),
      lat: parseCoordinate(latValue),
      lng: parseCoordinate(lngValue),
      transportMode: String(data.get("transportMode") || "walk"),
      transportDuration: Number(data.get("transportDuration") || 0),
      cityId: String(data.get("cityId") || "")
    };
  }

  function saveActivityFromForm(values, id = null) {
    const existing = state.activities.find((activity) => activity.id === id);
    const date = values.date || getTodayDate();
    const day = dayNumberForDate(date);
    const hasCoordinates =
      Number.isFinite(values.lat) &&
      Number.isFinite(values.lng) &&
      !(values.lat === 0 && values.lng === 0);
    const activity = {
      id: existing?.id || uid(),
      name: values.name,
      lat: hasCoordinates ? values.lat : null,
      lng: hasCoordinates ? values.lng : null,
      description: values.description || existing?.description || "",
      day,
      date,
      time: values.time || existing?.time || "",
      duration: values.duration || 60,
      transport: {
        mode: values.transportMode || existing?.transport?.mode || "walk",
        duration: values.transportDuration ?? existing?.transport?.duration ?? 15
      },
      note: values.note || "",
      category: values.category || "attraction",
      status: existing?.status || "pending",
      order: existing?.order || nextOrderForDate(date),
      cityId: values.cityId || cityForDate(date)?.id || state.trip.cities[0]?.id || ""
    };
    updateState((draft) => {
      const index = draft.activities.findIndex((item) => item.id === activity.id);
      if (index >= 0) draft.activities[index] = activity;
      else draft.activities.push(activity);
      normalizeOrders(draft.activities);
    });
    toastMessage(existing ? "活动已更新" : "已添加活动");
    if (activeTab === "map") refreshMapMarkers();
    return activity;
  }

  function nextOrderForDate(date) {
    const list = activitiesForDate(date);
    return list.length ? Math.max(...list.map((item) => item.order || 0)) + 1 : 1;
  }

  async function geocodeActivity(id, name, cityId) {
    const activity = state.activities.find((item) => item.id === id);
    if (!activity || Number.isFinite(activity.lat) && Number.isFinite(activity.lng)) return;
    const city = state.trip.cities.find((item) => item.id === cityId);
    try {
      const results = await searchPlaces(name, city?.name || "");
      const match = results.find(
        (item) => Number.isFinite(item.lat) && Number.isFinite(item.lon)
      );
      if (!match) {
        toastMessage("没有找到坐标，可以在地图里点选位置");
        return;
      }
      updateState((draft) => {
        const target = draft.activities.find((item) => item.id === id);
        if (!target) return;
        if (!Number.isFinite(target.lat) || !Number.isFinite(target.lng)) {
          target.lat = Number(match.lat);
          target.lng = Number(match.lon);
          if (!target.description) target.description = match.display_name || "";
        }
      });
      toastMessage("已在地图上标出");
      if (activeTab === "map") refreshMapMarkers();
    } catch (error) {
      console.info("地点自动定位失败", error);
      toastMessage("没有找到坐标，可以在地图里点选位置");
    }
  }

  function normalizeOrders(activities) {
    const byDate = new Map();
    activities.forEach((activity) => {
      if (!byDate.has(activity.date)) byDate.set(activity.date, []);
      byDate.get(activity.date).push(activity);
    });
    byDate.forEach((list) => {
      list.sort(compareActivities).forEach((activity, index) => {
        activity.order = index + 1;
        activity.day = dayNumberForDate(activity.date);
      });
    });
  }

  function toggleActivityStatus(id) {
    updateState((draft) => {
      const activity = draft.activities.find((item) => item.id === id);
      if (!activity) return;
      activity.status =
        activity.status === "done" ? "pending" : activity.status === "skipped" ? "pending" : "done";
    });
  }

  function setActivityStatus(id, status) {
    updateState((draft) => {
      const activity = draft.activities.find((item) => item.id === id);
      if (activity) activity.status = status;
    });
    toastMessage(status === "done" ? "已标记完成" : "已跳过");
  }

  async function deleteActivity(id) {
    const activity = state.activities.find((item) => item.id === id);
    if (!activity) return;
    const ok = await confirmAction("删除活动", `确定删除“${activity.name}”吗？`);
    if (!ok) return;
    const deleted = clone(activity);
    updateState((draft) => {
      draft.activities = draft.activities.filter((item) => item.id !== id);
      normalizeOrders(draft.activities);
    });
    selectedActivityId = null;
    renderMapCard();
    toastMessage(`已删除 ${deleted.name}`);
  }

  function showOnMap(id) {
    selectedActivityId = id;
    const activity = state.activities.find((item) => item.id === id);
    mapDay = activity?.date || "all";
    switchTab("map");
    requestAnimationFrame(() => {
      refreshMapMarkers();
      if (activity?.lat && activity?.lng) {
        map?.flyTo([activity.lat, activity.lng], 16, { duration: 0.6 });
      }
      renderMapCard();
    });
  }

  function navigateToActivity(id) {
    const activity = state.activities.find((item) => item.id === id);
    if (!activity) return;
    if (!Number.isFinite(activity.lat) || !Number.isFinite(activity.lng)) {
      toastMessage("这个地点还没有经纬度");
      return;
    }
    const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    const mode = activity.transport?.mode || "walk";
    const appleMode = mode === "walk" ? "w" : mode === "transit" ? "r" : "d";
    const url = isApple
      ? `https://maps.apple.com/?daddr=${activity.lat},${activity.lng}&dirflg=${appleMode}`
      : `https://www.google.com/maps/dir/?api=1&destination=${activity.lat},${activity.lng}&travelmode=${googleTravelMode(mode)}`;
    window.open(url, "_blank", "noopener");
  }

  function googleTravelMode(mode) {
    if (mode === "walk") return "walking";
    if (mode === "transit") return "transit";
    return "driving";
  }

  function previousActivityForDate(date, time) {
    const list = activitiesForDate(date);
    const filtered = time ? list.filter((activity) => (activity.time || "99:99") < time) : list;
    return filtered.at(-1) || null;
  }

  function moveActivityToDay(id) {
    const activity = state.activities.find((item) => item.id === id);
    if (!activity) return;
    const dates = tripDates();
    openSheet(
      "移到其他天",
      `
        <div class="sheet-form">
          ${dates
            .map(
              (date, index) => `
                <button class="button ${date === activity.date ? "soft" : "ghost"}" type="button" data-move-date="${date}">
                  Day ${index + 1} · ${escapeHtml(formatShortDate(date))}
                </button>
              `
            )
            .join("")}
        </div>
      `,
      (sheet) => {
        sheet.querySelectorAll("[data-move-date]").forEach((button) => {
          button.addEventListener("click", () => {
            moveActivityToDate(id, button.dataset.moveDate);
            closeSheet();
          });
        });
      }
    );
  }

  function moveActivityToDate(id, date) {
    const targetCity = cityForDate(date);
    updateState((draft) => {
      const activity = draft.activities.find((item) => item.id === id);
      if (!activity) return;
      activity.date = date;
      activity.day = dayNumberForDate(date);
      if (targetCity) activity.cityId = targetCity.id;
      activity.order = nextOrderForDate(date);
      normalizeOrders(draft.activities);
    });
    selectedActivityId = id;
    toastMessage("已移动");
    if (activeTab === "map") refreshMapMarkers();
    renderMapCard();
  }

  function addDay() {
    const dates = tripDates();
    const last = dates.at(-1);
    if (!last) {
      openTripSetupSheet();
      return;
    }
    const next = parseDate(last);
    next.setDate(next.getDate() + 1);
    const nextDate = toDateString(next);
    updateState((draft) => {
      draft.trip.endDate = nextDate;
      const previousCityId = cityForDate(last)?.id || draft.trip.cities[0]?.id || "";
      if (previousCityId) {
        const previousYear = parseDate(nextDate).getFullYear();
        const currentYear = parseDate(last).getFullYear();
        if (previousYear !== currentYear) {
          toastMessage("跨年日期已添加");
        }
      }
    });
    toastMessage(`已添加 ${formatShortDate(nextDate)}`);
  }

  function removeLastDay() {
    const dates = tripDates();
    if (dates.length <= 1) {
      toastMessage("至少保留一天");
      return;
    }
    const lastDate = dates.at(-1);
    const previousDate = dates.at(-2);
    const activities = activitiesForDate(lastDate);
    const previousCity = cityForDate(previousDate);

    if (!activities.length) {
      confirmAction("删除最后一天", `确定删除 ${formatShortDate(lastDate)} 吗？`).then((ok) => {
        if (!ok) return;
        updateState((draft) => {
          draft.trip.endDate = previousDate;
        });
        toastMessage("最后一天已删除");
      });
      return;
    }

    openSheet(
      "删除最后一天",
      `
        <div class="sheet-form">
          <div class="status-line">
            ${escapeHtml(formatShortDate(lastDate))} 还有 ${activities.length} 个活动。
          </div>
          <button class="button soft" type="button" data-move-last-day-activities>
            <i data-lucide="move-left"></i>把活动移到 ${escapeHtml(formatShortDate(previousDate))}
          </button>
          <button class="button danger" type="button" data-delete-last-day-activities>
            <i data-lucide="trash-2"></i>删除这一天的活动
          </button>
          <div class="sheet-actions">
            <button class="button ghost" type="button" data-sheet-close>取消</button>
          </div>
        </div>
      `,
      (sheet) => {
        sheet.querySelectorAll("[data-sheet-close]").forEach((button) => {
          button.addEventListener("click", closeSheet);
        });
        sheet.querySelector("[data-move-last-day-activities]")?.addEventListener("click", () => {
          updateState((draft) => {
            draft.trip.endDate = previousDate;
            draft.activities.forEach((activity) => {
              if (activity.date === lastDate) {
                activity.date = previousDate;
                activity.day = dayNumberForDate(previousDate);
                if (previousCity) activity.cityId = previousCity.id;
              }
            });
            normalizeOrders(draft.activities);
          });
          closeSheet();
          toastMessage("活动已移到前一天");
        });
        sheet.querySelector("[data-delete-last-day-activities]")?.addEventListener("click", () => {
          updateState((draft) => {
            draft.trip.endDate = previousDate;
            draft.activities = draft.activities.filter((activity) => activity.date !== lastDate);
            normalizeOrders(draft.activities);
          });
          closeSheet();
          toastMessage("最后一天和活动已删除");
        });
      }
    );
  }

  function openTripSetupSheet() {
    const today = realTodayString();
    const defaultEndDate = toDateString(new Date(Date.now() + 2 * 86400000));
    openSheet(
      tripDates().length ? "编辑旅行信息" : "建立我的旅行",
      `
        <form class="sheet-form" id="tripSetupForm">
          <div class="field">
            <label for="tripSetupName">行程名称</label>
            <input id="tripSetupName" name="name" value="${escapeAttribute(state.trip.name || "我的旅行")}" />
          </div>
          <div class="field-grid two">
            <div class="field">
              <label for="tripSetupStart">开始日期</label>
              <input id="tripSetupStart" name="startDate" type="date" value="${state.trip.startDate || today}" required />
            </div>
            <div class="field">
              <label for="tripSetupEnd">结束日期</label>
              <input id="tripSetupEnd" name="endDate" type="date" value="${state.trip.endDate || defaultEndDate}" required />
            </div>
          </div>
          <div class="field">
            <label for="tripSetupCity">主要城市</label>
            <input id="tripSetupCity" name="city" placeholder="例如：北京、上海、东京" />
          </div>
          <p class="day-summary-copy" style="margin:0;color:var(--muted);font-size:12px;line-height:1.5">
            城市名称会自动尝试定位。没有找到坐标也没关系，可以稍后在设置中添加。
          </p>
          <div class="sheet-actions">
            <button class="button ghost" type="button" data-sheet-close>取消</button>
            <button class="button primary" type="submit"><i data-lucide="check"></i>保存</button>
          </div>
        </form>
      `,
      (sheet) => {
        sheet.querySelectorAll("[data-sheet-close]").forEach((button) => {
          button.addEventListener("click", closeSheet);
        });
        sheet.querySelector("#tripSetupForm")?.addEventListener("submit", async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = String(data.get("name") || "").trim() || "我的旅行";
          const startDate = String(data.get("startDate") || "");
          const endDate = String(data.get("endDate") || "");
          const cityName = String(data.get("city") || "").trim();
          if (!startDate || !endDate || endDate < startDate) {
            toastMessage("结束日期不能早于开始日期");
            return;
          }

          updateState((draft) => {
            draft.trip.name = name;
            draft.trip.startDate = startDate;
            draft.trip.endDate = endDate;
          }, { skipCloud: true, skipRender: true });

          if (cityName && !state.trip.cities.some((city) => city.name === cityName)) {
            let city = { id: uid(), name: cityName, lat: 35.8617, lng: 104.1954 };
            try {
              const results = await searchPlaces(cityName);
              if (results[0] && Number.isFinite(results[0].lat) && Number.isFinite(results[0].lon)) {
                city = { id: uid(), name: cityName, lat: results[0].lat, lng: results[0].lon };
              }
            } catch (error) {
              console.info("城市定位失败，已使用默认坐标", error);
            }
            updateState((draft) => {
              if (!draft.trip.cities.some((item) => item.name === cityName)) {
                draft.trip.cities.push(city);
              }
            }, { skipCloud: true, skipRender: true });
          }

          persist();
          closeSheet();
          refreshWeather(false);
          toastMessage("旅行信息已保存");
        });
      }
    );
  }

  function openCitySwitcher(date) {
    const current = cityForDate(date);
    openSheet(
      "更换今日城市",
      `
        <div class="sheet-form">
          <div class="status-line">
            当前日期：${escapeHtml(formatShortDate(date))}
            ${current ? ` · 当前城市：${escapeHtml(current.name)}` : ""}
          </div>
          <div class="field-grid">
            ${
              state.trip.cities.length
                ? state.trip.cities
                    .map(
                      (city) => `
                        <button
                          class="button ${city.id === current?.id ? "soft" : "ghost"}"
                          type="button"
                          data-select-day-city="${city.id}"
                        >
                          <i data-lucide="${city.id === current?.id ? "check" : "map-pin"}"></i>
                          ${escapeHtml(city.name)}
                        </button>
                      `
                    )
                    .join("")
                : `
                  <div class="status-line">
                    还没有城市，先添加一个城市。
                  </div>
                `
            }
            <button class="button primary" type="button" data-add-city-for-day>
              <i data-lucide="plus"></i>新增城市
            </button>
            ${
              current
                ? `<button class="button ghost" type="button" data-edit-city-for-day data-id="${current.id}">
                    <i data-lucide="pencil"></i>编辑当前城市
                  </button>`
                : ""
            }
          </div>
          <div class="sheet-actions">
            <button class="button ghost" type="button" data-sheet-close>取消</button>
          </div>
        </div>
      `,
      (sheet) => {
        sheet.querySelectorAll("[data-sheet-close]").forEach((button) => {
          button.addEventListener("click", closeSheet);
        });
        sheet.querySelectorAll("[data-select-day-city]").forEach((button) => {
          button.addEventListener("click", () => {
            assignCityToDate(date, button.dataset.selectDayCity);
            closeSheet();
          });
        });
        sheet.querySelector("[data-add-city-for-day]")?.addEventListener("click", () => {
          closeSheet();
          openCitySheet(null, { assignToDate: date });
        });
        sheet.querySelector("[data-edit-city-for-day]")?.addEventListener("click", (event) => {
          const cityId = event.currentTarget.dataset.id;
          closeSheet();
          openCitySheet(cityId, { assignToDate: date });
        });
      }
    );
  }

  function assignCityToDate(date, cityId) {
    const city = state.trip.cities.find((item) => item.id === cityId);
    if (!city) return;
    updateState((draft) => {
      draft.trip.dayCities ||= {};
      draft.trip.dayCities[date] = cityId;
      draft.activities.forEach((activity) => {
        if (activity.date === date) activity.cityId = cityId;
      });
    });
    toastMessage(`已切换到 ${city.name}`);
  }

  function openCitySheet(id = null, options = {}) {
    const editing = state.trip.cities.find((city) => city.id === id) || null;
    const assignToDate = options.assignToDate || null;
    openSheet(
      editing ? "编辑城市" : "添加城市",
      `
        <form class="sheet-form" id="cityForm">
          <div class="field">
            <label for="cityName">城市名称 *</label>
            <input id="cityName" name="name" required value="${escapeAttribute(editing?.name || "")}" placeholder="例如：天津" />
          </div>
          <div class="inline-actions">
            <button class="button soft" type="button" id="lookupCity">
              <i data-lucide="search"></i>自动查找坐标
            </button>
          </div>
          <div class="field-grid two">
            <div class="field">
              <label for="cityLat">纬度</label>
              <input id="cityLat" name="lat" type="number" step="0.000001" value="${escapeAttribute(editing?.lat ?? "")}" placeholder="39.1175" required />
            </div>
            <div class="field">
              <label for="cityLng">经度</label>
              <input id="cityLng" name="lng" type="number" step="0.000001" value="${escapeAttribute(editing?.lng ?? "")}" placeholder="117.2009" required />
            </div>
          </div>
          <div class="status-line" id="cityLookupStatus">
            修改名称后可以重新查找坐标；已有活动会自动跟随这个城市。
          </div>
          <div class="sheet-actions">
            <button class="button ghost" type="button" data-sheet-close>取消</button>
            <button class="button primary" type="submit"><i data-lucide="check"></i>保存</button>
          </div>
        </form>
      `,
      (sheet) => {
        sheet.querySelectorAll("[data-sheet-close]").forEach((button) => {
          button.addEventListener("click", closeSheet);
        });
        sheet.querySelector("#lookupCity")?.addEventListener("click", async (event) => {
          const button = event.currentTarget;
          const name = sheet.querySelector("#cityName")?.value.trim();
          const status = sheet.querySelector("#cityLookupStatus");
          if (!name) {
            toastMessage("先填写城市名称");
            return;
          }
          button.disabled = true;
          button.innerHTML = '<i data-lucide="loader-circle"></i>查找中';
          refreshIcons(button);
          try {
            const results = await searchPlaces(name);
            const result = results.find(
              (item) => Number.isFinite(item.lat) && Number.isFinite(item.lon)
            );
            if (!result) throw new Error("没有找到坐标");
            sheet.querySelector("#cityLat").value = Number(result.lat).toFixed(6);
            sheet.querySelector("#cityLng").value = Number(result.lon).toFixed(6);
            status.textContent = `已定位：${result.display_name || name}`;
          } catch (error) {
            status.textContent = "没有找到坐标，可以手动填写或稍后再试。";
          } finally {
            button.disabled = false;
            button.innerHTML = '<i data-lucide="search"></i>自动查找坐标';
            refreshIcons(button);
          }
        });
        sheet.querySelector("#cityForm")?.addEventListener("submit", (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const city = {
            id: editing?.id || uid(),
            name: String(data.get("name") || "").trim(),
            lat: Number(data.get("lat")),
            lng: Number(data.get("lng"))
          };
          if (!city.name || !Number.isFinite(city.lat) || !Number.isFinite(city.lng)) {
            toastMessage("请填写城市名称、纬度和经度");
            return;
          }
          updateState((draft) => {
            const index = draft.trip.cities.findIndex((item) => item.id === city.id);
            if (index >= 0) draft.trip.cities[index] = city;
            else draft.trip.cities.push(city);
            if (assignToDate) {
              draft.trip.dayCities ||= {};
              draft.trip.dayCities[assignToDate] = city.id;
              draft.activities.forEach((activity) => {
                if (activity.date === assignToDate) activity.cityId = city.id;
              });
            }
          }, { skipCloud: true });
          closeSheet();
          refreshWeather(true);
          toastMessage(editing ? "城市已更新" : "城市已添加");
        });
      }
    );
  }

  async function deleteCity(id) {
    const city = state.trip.cities.find((item) => item.id === id);
    if (!city) return;
    const usedActivities = state.activities.filter((activity) => activity.cityId === id);
    const otherCities = state.trip.cities.filter((item) => item.id !== id);

    if (!usedActivities.length) {
      const ok = await confirmAction("删除城市", `确定删除“${city.name}”吗？`);
      if (!ok) return;
      updateState((draft) => {
        draft.trip.cities = draft.trip.cities.filter((item) => item.id !== id);
        Object.keys(draft.trip.dayCities || {}).forEach((date) => {
          if (draft.trip.dayCities[date] === id) delete draft.trip.dayCities[date];
        });
      });
      toastMessage("城市已删除");
      return;
    }

    openSheet(
      "删除城市",
      `
        <div class="sheet-form">
          <div class="status-line">
            “${escapeHtml(city.name)}”仍关联 ${usedActivities.length} 个活动。请选择如何处理这些活动。
          </div>
          <div class="field-grid">
            ${otherCities
              .map(
                (target) => `
                  <button class="button ghost" type="button" data-reassign-city="${target.id}">
                    <i data-lucide="move-right"></i>移到 ${escapeHtml(target.name)}
                  </button>
                `
              )
              .join("")}
            <button class="button soft" type="button" data-reassign-city="">
              <i data-lucide="circle-slash-2"></i>保留活动但清除城市
            </button>
            <button class="button danger" type="button" data-delete-city-activities>
              <i data-lucide="trash-2"></i>同时删除这些活动
            </button>
          </div>
          <div class="sheet-actions">
            <button class="button ghost" type="button" data-sheet-close>取消</button>
          </div>
        </div>
      `,
      (sheet) => {
        sheet.querySelectorAll("[data-sheet-close]").forEach((button) => {
          button.addEventListener("click", closeSheet);
        });
        sheet.querySelectorAll("[data-reassign-city]").forEach((button) => {
          button.addEventListener("click", () => {
            const targetCityId = button.dataset.reassignCity;
            updateState((draft) => {
              draft.trip.cities = draft.trip.cities.filter((item) => item.id !== id);
              draft.activities.forEach((activity) => {
                if (activity.cityId === id) activity.cityId = targetCityId;
              });
              Object.keys(draft.trip.dayCities || {}).forEach((date) => {
                if (draft.trip.dayCities[date] === id) {
                  if (targetCityId) draft.trip.dayCities[date] = targetCityId;
                  else delete draft.trip.dayCities[date];
                }
              });
            });
            closeSheet();
            toastMessage(targetCityId ? "城市已删除，活动已转移" : "城市已删除，活动已保留");
          });
        });
        sheet.querySelector("[data-delete-city-activities]")?.addEventListener("click", () => {
          updateState((draft) => {
            draft.trip.cities = draft.trip.cities.filter((item) => item.id !== id);
            draft.activities = draft.activities.filter((activity) => activity.cityId !== id);
            Object.keys(draft.trip.dayCities || {}).forEach((date) => {
              if (draft.trip.dayCities[date] === id) delete draft.trip.dayCities[date];
            });
            normalizeOrders(draft.activities);
          });
          closeSheet();
          toastMessage("城市和相关活动已删除");
        });
      }
    );
  }

  function bindSettingsEvents() {
    view.querySelectorAll("[data-setting]").forEach((input) => {
      input.addEventListener("change", () => {
        const path = input.dataset.setting;
        const value =
          input.type === "checkbox"
            ? input.checked
            : input.type === "number"
              ? Number(input.value)
              : input.value;
        setByPath(state, path, value);
        persist({ skipCloud: path.startsWith("settings.supabase") });
        if (path === "settings.supabase.enabled") setupCloudPolling();
      });
    });
    view.querySelector("#importFile")?.addEventListener("change", importData);
  }

  function setByPath(target, path, value) {
    const keys = path.split(".");
    let cursor = target;
    keys.slice(0, -1).forEach((key) => {
      if (!cursor[key] || typeof cursor[key] !== "object") cursor[key] = {};
      cursor = cursor[key];
    });
    cursor[keys.at(-1)] = value;
  }

  function resetTrip() {
    const title = IS_LOCAL_PREVIEW ? "恢复天津示例" : "清空行程";
    const message = IS_LOCAL_PREVIEW
      ? "当前本地行程会被 5 天 4 晚的天津示例覆盖。"
      : "当前行程、地点和日期都会被清空。";
    confirmAction(title, message).then((ok) => {
      if (!ok) return;
      state = clone(IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE);
      persist();
      toastMessage(IS_LOCAL_PREVIEW ? "已恢复天津示例" : "行程已清空");
    });
  }

  async function forceAppUpdate() {
    const ok = await confirmAction(
      "刷新应用缓存",
      "会清除旧版 PWA 缓存并重新加载。浏览器中的行程数据仍会保留。"
    );
    if (!ok) return;
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
    } finally {
      location.reload();
    }
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${state.trip.name || "trip"}-${realTodayString()}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function normalizeImportedTrip(parsed) {
    if (parsed?.trip && Array.isArray(parsed.activities)) {
      return sanitizeImportedTrip(parsed);
    }

    const days =
      parsed?.daily_itinerary ||
      parsed?.dailyItinerary ||
      parsed?.itinerary?.days ||
      parsed?.days ||
      (Array.isArray(parsed?.itinerary) ? parsed.itinerary : null);
    if (!Array.isArray(days) || !days.length) {
      throw new Error("不支持的行程 JSON 格式");
    }

    const title =
      cleanImportedText(parsed.trip_title || parsed.title || parsed.trip?.name, 120) ||
      "导入的旅行";
    const destination =
      cleanImportedText(
        parsed.destination ||
          parsed.city ||
          parsed.trip?.cities?.[0]?.name ||
          parsed.base_hotel?.area,
        80
      ) || "旅行目的地";
    const startDate =
      normalizeImportedDate(parsed.startDate) ||
      normalizeImportedDate(parsed.start_date) ||
      normalizeImportedDate(parsed.trip?.startDate) ||
      realTodayString();
    const cityId = uid();
    const coordinates = knownCityCoordinates(destination);
    let cityLat = parseCoordinate(parsed.city_lat ?? parsed.lat ?? coordinates.lat);
    let cityLng = parseCoordinate(parsed.city_lng ?? parsed.lng ?? coordinates.lng);
    if (
      !Number.isFinite(cityLat) ||
      !Number.isFinite(cityLng) ||
      Math.abs(cityLat) > 90 ||
      Math.abs(cityLng) > 180
    ) {
      cityLat = coordinates.lat;
      cityLng = coordinates.lng;
    }
    const city = {
      id: cityId,
      name: destination,
      lat: cityLat,
      lng: cityLng
    };

    const activities = [];
    days.slice(0, 60).forEach((day, dayIndex) => {
      const dayNumber = Number(day.day || day.day_number || dayIndex + 1);
      const date = addDaysToDateString(startDate, dayNumber - 1);
      const dayActivities =
        day.activities ||
        day.items ||
        day.places ||
        day.schedule ||
        [];
      if (!Array.isArray(dayActivities)) return;

      dayActivities.slice(0, 500).forEach((rawActivity, activityIndex) => {
        const item =
          typeof rawActivity === "string"
            ? { activity: rawActivity }
            : rawActivity || {};
        const name = cleanImportedText(
          item.name ||
            item.activity ||
            item.title ||
            item.place ||
            item.location ||
            `活动 ${activityIndex + 1}`,
          200
        );
        const description = cleanImportedText(item.description || item.summary || "", 2000);
        const noteParts = [];
        const tips = cleanImportedText(item.tips || item.note || "", 1000);
        const diningTips = cleanImportedText(item.dining_tips || "", 1000);
        const foods = Array.isArray(item.food_recommendations)
          ? item.food_recommendations
              .slice(0, 30)
              .map((food) => cleanImportedText(food, 200))
              .filter(Boolean)
          : [];
        if (tips) noteParts.push(tips);
        if (diningTips) noteParts.push(`用餐：${diningTips}`);
        if (foods.length) noteParts.push(`推荐：${foods.join("；")}`);

        let lat = parseCoordinate(item.lat ?? item.latitude ?? item.coordinates?.lat);
        let lng = parseCoordinate(item.lng ?? item.longitude ?? item.coordinates?.lng);
        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng) ||
          (lat === 0 && lng === 0) ||
          Math.abs(lat) > 90 ||
          Math.abs(lng) > 180
        ) {
          lat = null;
          lng = null;
        }
        activities.push({
          id: uid(),
          name,
          lat,
          lng,
          description: description || cleanImportedText(day.theme || "", 2000),
          day: dayNumber,
          date,
          time: normalizeAiTime(item.time),
          duration: Math.min(1440, Math.max(5, Number(item.duration || item.duration_minutes || 90))),
          transport: {
            mode: normalizeTransportMode(item.transport || item.transport_mode || item.mode),
            duration: Number(item.transport_duration || item.transport_minutes || 15)
          },
          note: noteParts.join("；"),
          category: normalizeCategory(item.category, name, foods),
          status: "pending",
          order: activityIndex + 1,
          cityId
        });
      });
    });

    return {
      version: APP_VERSION,
      updatedAt: Date.now(),
      trip: {
        name: title,
        startDate,
        endDate: addDaysToDateString(startDate, Math.max(0, days.length - 1)),
        cities: [city]
      },
      settings: clone((IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE).settings),
      activities,
      weatherCache: {}
    };
  }

  function sanitizeImportedTrip(parsed) {
    const rawTrip = parsed?.trip && typeof parsed.trip === "object" ? parsed.trip : {};
    const startDate = normalizeImportedDate(rawTrip.startDate) || realTodayString();
    let endDate = normalizeImportedDate(rawTrip.endDate) || startDate;
    if (endDate < startDate) endDate = startDate;

    const cityIdMap = new Map();
    const cities = (Array.isArray(rawTrip.cities) ? rawTrip.cities : [])
      .slice(0, 50)
      .filter((city) => city && typeof city === "object")
      .map((city) => {
        const id = uid();
        if (city.id) cityIdMap.set(String(city.id), id);
        let lat = parseCoordinate(city.lat);
        let lng = parseCoordinate(city.lng);
        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng) ||
          Math.abs(lat) > 90 ||
          Math.abs(lng) > 180
        ) {
          lat = null;
          lng = null;
        }
        return {
          id,
          name: cleanImportedText(city.name, 80) || "未命名城市",
          lat,
          lng
        };
      });

    const activities = (Array.isArray(parsed.activities) ? parsed.activities : [])
      .slice(0, 1000)
      .filter((activity) => activity && typeof activity === "object")
      .map((activity, index) => {
        const date = normalizeImportedDate(activity.date) || startDate;
        let lat = parseCoordinate(activity.lat);
        let lng = parseCoordinate(activity.lng);
        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng) ||
          (lat === 0 && lng === 0) ||
          Math.abs(lat) > 90 ||
          Math.abs(lng) > 180
        ) {
          lat = null;
          lng = null;
        }
        const cityId = cityIdMap.get(String(activity.cityId)) || cities[0]?.id || "";
        const duration = Math.min(1440, Math.max(5, Number(activity.duration) || 60));
        const transportDuration = Math.min(
          1440,
          Math.max(0, Number(activity.transport?.duration) || 0)
        );
        return {
          id: uid(),
          name: cleanImportedText(activity.name, 200) || `活动 ${index + 1}`,
          lat,
          lng,
          description: cleanImportedText(activity.description, 2000),
          day:
            Math.max(
              1,
              Math.round(
                (parseDate(date).getTime() - parseDate(startDate).getTime()) / 86400000
              ) + 1
            ) || index + 1,
          date,
          time: normalizeImportedTime(activity.time),
          duration,
          transport: {
            mode: Object.prototype.hasOwnProperty.call(TRANSPORT, activity.transport?.mode)
              ? activity.transport.mode
              : "walk",
            duration: transportDuration
          },
          note: cleanImportedText(activity.note, 1000),
          category: Object.prototype.hasOwnProperty.call(CATEGORY, activity.category)
            ? activity.category
            : "attraction",
          status: ["pending", "done", "skipped"].includes(activity.status)
            ? activity.status
            : "pending",
          order: Number.isFinite(Number(activity.order)) ? Number(activity.order) : index + 1,
          cityId
        };
      });

    const dayCities = {};
    Object.entries(rawTrip.dayCities || {}).forEach(([date, cityId]) => {
      const normalizedDate = normalizeImportedDate(date);
      const normalizedCityId = cityIdMap.get(String(cityId));
      if (normalizedDate && normalizedCityId) dayCities[normalizedDate] = normalizedCityId;
    });

    return {
      version: APP_VERSION,
      updatedAt: Date.now(),
      trip: {
        name: cleanImportedText(rawTrip.name, 120) || "导入的旅行",
        startDate,
        endDate,
        dayCities,
        cities
      },
      settings: clone((IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE).settings),
      activities,
      weatherCache: {}
    };
  }

  function cleanImportedText(value, maxLength = 4000) {
    return String(value ?? "")
      .replace(/\[citation:\d+\]/gi, "")
      .replace(/&#x20;/gi, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function normalizeImportedDate(value) {
    const text = cleanImportedText(value, 20);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return "";
    const date = parseDate(text);
    return date && toDateString(date) === text ? text : "";
  }

  function normalizeImportedTime(value) {
    return normalizeAiTime(value);
  }

  function normalizeAiTime(value) {
    const text = cleanImportedText(value);
    const exact = text.match(/^(\d{1,2}):(\d{2})$/);
    if (exact) return `${String(exact[1]).padStart(2, "0")}:${exact[2]}`;
    const hourMatch = text.match(/(?:下午|傍晚|晚上|晚间)?\s*(\d{1,2})\s*点/);
    if (hourMatch) {
      let hour = Number(hourMatch[1]);
      if (/下午|傍晚|晚上|晚间/.test(text) && hour < 12) hour += 12;
      return `${String(hour).padStart(2, "0")}:00`;
    }
    if (/清晨|早上|上午/.test(text)) return "09:00";
    if (/中午/.test(text)) return "12:00";
    if (/午后|下午/.test(text)) return "14:30";
    if (/傍晚/.test(text)) return "17:30";
    if (/晚间|晚上/.test(text)) return "19:30";
    return "";
  }

  function normalizeTransportMode(value) {
    const text = cleanImportedText(value).toLowerCase();
    if (["transit", "public", "metro", "bus"].includes(text) || /公交|地铁/.test(text)) {
      return "transit";
    }
    if (["taxi", "car"].includes(text) || /打车|出租车/.test(text)) return "taxi";
    if (["drive", "driving"].includes(text) || /自驾|租车/.test(text)) return "drive";
    return "walk";
  }

  function normalizeCategory(value, name, foods) {
    const category = cleanImportedText(value);
    if (Object.prototype.hasOwnProperty.call(CATEGORY, category)) return category;
    if (foods?.length || /餐|美食|小吃|饭店|酒家|面|馄饨|小笼|糕|餐厅/.test(name)) {
      return "restaurant";
    }
    if (/酒店|入住|民宿|住宿/.test(name)) return "hotel";
    if (/机场|车站|地铁|交通/.test(name)) return "transport";
    if (/购物|商场|商店/.test(name)) return "shopping";
    return "attraction";
  }

  function addDaysToDateString(dateString, amount) {
    const date = parseDate(dateString) || new Date();
    date.setDate(date.getDate() + Number(amount || 0));
    return toDateString(date);
  }

  function knownCityCoordinates(name) {
    const cities = {
      上海: { lat: 31.2304, lng: 121.4737 },
      北京: { lat: 39.9042, lng: 116.4074 },
      天津: { lat: 39.1175, lng: 117.2009 },
      广州: { lat: 23.1291, lng: 113.2644 },
      深圳: { lat: 22.5431, lng: 114.0579 },
      杭州: { lat: 30.2741, lng: 120.1551 },
      南京: { lat: 32.0603, lng: 118.7969 },
      成都: { lat: 30.5728, lng: 104.0668 },
      重庆: { lat: 29.563, lng: 106.5516 },
      西安: { lat: 34.3416, lng: 108.9398 },
      厦门: { lat: 24.4798, lng: 118.0894 },
      青岛: { lat: 36.0671, lng: 120.3826 }
    };
    const key = Object.keys(cities).find((cityName) => name.includes(cityName));
    return key ? cities[key] : { lat: 35.8617, lng: 104.1954 };
  }

  function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toastMessage("JSON 文件过大，请控制在 5 MB 以内");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const normalized = normalizeImportedTrip(parsed);
        normalized.importedAt = Date.now();
        const base = IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE;
        state = deepMerge(clone(base), normalized);
        persist();
        toastMessage(normalized.activities?.length ? "导入成功，已生成地图行程" : "导入成功");
      } catch (error) {
        toastMessage("JSON 文件无法读取");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  function bindItineraryInteractions() {
    bindDragSort();
    view.querySelectorAll(".activity-row").forEach((row) => bindRowSwipe(row));
  }

  function bindTodaySwipe() {
    view.querySelectorAll(".activity-card").forEach((card) => {
      let startX = 0;
      let currentX = 0;
      let swiping = false;
      const id = card.dataset.activityId;

      card.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button")) return;
        startX = event.clientX;
        currentX = startX;
        swiping = true;
      });
      card.addEventListener("pointermove", (event) => {
        if (!swiping) return;
        currentX = event.clientX;
        const delta = currentX - startX;
        if (Math.abs(delta) > 8) {
          card.style.transform = `translateX(${Math.max(-90, Math.min(90, delta * 0.55))}px)`;
        }
      });
      card.addEventListener("pointerup", () => {
        if (!swiping) return;
        swiping = false;
        const delta = currentX - startX;
        card.style.transform = "";
        if (Math.abs(delta) < 72) return;
        setActivityStatus(id, delta > 0 ? "done" : "skipped");
      });
      card.addEventListener("pointercancel", () => {
        swiping = false;
        card.style.transform = "";
      });
    });
  }

  function bindRowSwipe(row) {
    let startX = 0;
    let currentX = 0;
    let swiping = false;
    row.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      startX = event.clientX;
      currentX = startX;
      swiping = true;
    });
    row.addEventListener("pointermove", (event) => {
      if (!swiping) return;
      currentX = event.clientX;
      const delta = currentX - startX;
      if (delta < -18) row.classList.add("swipe-delete");
      else row.classList.remove("swipe-delete");
    });
    row.addEventListener("pointerup", () => {
      if (!swiping) return;
      swiping = false;
      const delta = currentX - startX;
      row.classList.remove("swipe-delete");
      if (delta < -88) deleteActivity(row.dataset.activityId);
    });
    row.addEventListener("pointercancel", () => {
      swiping = false;
      row.classList.remove("swipe-delete");
    });
  }

  function bindDragSort() {
    view.querySelectorAll(".activity-row").forEach((row) => {
      row.draggable = true;
      row.addEventListener("dragstart", (event) => {
        row.classList.add("dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", row.dataset.activityId);
      });
      row.addEventListener("dragend", () => {
        row.classList.remove("dragging");
        saveDomOrder(row);
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        const dragging = view.querySelector(".activity-row.dragging");
        if (!dragging || dragging === row || dragging.parentElement !== row.parentElement) return;
        const rect = row.getBoundingClientRect();
        const after = event.clientY > rect.top + rect.height / 2;
        row.parentElement.insertBefore(dragging, after ? row.nextSibling : row);
      });
    });
  }

  function saveDomOrder(sourceRow) {
    const container = sourceRow.closest(".day-body");
    if (!container) return;
    const ids = [...container.querySelectorAll(".activity-row")].map((row) => row.dataset.activityId);
    updateState((draft) => {
      ids.forEach((id, index) => {
        const activity = draft.activities.find((item) => item.id === id);
        if (activity) activity.order = index + 1;
      });
    });
  }

  function setupCloudPolling() {
    clearInterval(cloudTimer);
    cloudTimer = null;
    if (!state.settings.supabase.enabled || !isCloudConfigured()) return;
    cloudTimer = setInterval(() => cloudPull(false), 12000);
  }

  function isCloudConfigured() {
    const cloud = state.settings.supabase;
    return Boolean(
      cloud.url &&
        cloud.anonKey &&
        cloud.tripId &&
        String(cloud.secret || "").length >= 16
    );
  }

  function cloudHeaders() {
    const cloud = state.settings.supabase;
    return {
      apikey: cloud.anonKey,
      Authorization: `Bearer ${cloud.anonKey}`,
      "Content-Type": "application/json",
      "x-trip-secret": cloud.secret
    };
  }

  function generateSupabaseSecret() {
    if (!crypto.getRandomValues) {
      toastMessage("当前浏览器不支持安全随机数，请手动填写至少 16 位密钥");
      return;
    }
    const bytes = crypto.getRandomValues(new Uint8Array(24));
    const secret = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    state.settings.supabase.secret = secret;
    persist({ skipCloud: true });
    const input = document.getElementById("supabaseSecret");
    if (input) input.value = secret;
    toastMessage("已生成新的行程共享密钥");
  }

  async function hashTripSecret(secret) {
    if (!crypto.subtle) throw new Error("当前浏览器不支持安全哈希，请使用 HTTPS 打开");
    const bytes = new TextEncoder().encode(secret);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function cloudSafeState() {
    const payload = clone(state);
    payload.settings = {};
    return payload;
  }

  function scheduleCloudPush() {
    if (!state.settings.supabase.enabled || !isCloudConfigured() || suppressCloudPush) return;
    clearTimeout(scheduleCloudPush.timer);
    scheduleCloudPush.timer = setTimeout(() => cloudPush(false), 1500);
  }

  async function cloudPush(showToast = false) {
    if (!isCloudConfigured()) {
      if (showToast) toastMessage("请先填写 Supabase URL、Anon Key、行程 ID 和共享密钥");
      return;
    }
    const cloud = state.settings.supabase;
    const endpoint = `${cloud.url.replace(/\/$/, "")}/rest/v1/trip_state`;
    try {
      const secretHash = await hashTripSecret(cloud.secret);
      const response = await fetch(`${endpoint}?on_conflict=id`, {
        method: "POST",
        headers: {
          ...cloudHeaders(),
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify([
          {
            id: cloud.tripId,
            secret_hash: secretHash,
            data: cloudSafeState(),
            updated_at: new Date(state.updatedAt || Date.now()).toISOString()
          }
        ])
      });
      if (!response.ok) throw new Error(await response.text());
      updateCloudStatus("上传成功");
      if (showToast) toastMessage("已上传到 Supabase");
    } catch (error) {
      updateCloudStatus(`上传失败：${error.message}`, true);
      if (showToast) toastMessage("云同步上传失败");
    }
  }

  async function cloudPull(showToast = false) {
    if (!isCloudConfigured()) {
      if (showToast) toastMessage("请先填写 Supabase 配置");
      return;
    }
    const cloud = state.settings.supabase;
    const endpoint = `${cloud.url.replace(/\/$/, "")}/rest/v1/trip_state?id=eq.${encodeURIComponent(
      cloud.tripId
    )}&select=data,updated_at`;
    try {
      const response = await fetch(endpoint, { headers: cloudHeaders() });
      if (!response.ok) throw new Error(await response.text());
      const rows = await response.json();
      if (!rows.length) {
        await cloudPush(false);
        return;
      }
      const remote = rows[0].data;
      const remoteUpdated = Number(new Date(remote.updatedAt || rows[0].updated_at));
      const localUpdated = Number(state.updatedAt || 0);
      if (remoteUpdated > localUpdated + 500) {
        suppressCloudPush = true;
        const localSettings = clone(state.settings);
        const normalizedRemote = sanitizeImportedTrip(remote);
        normalizedRemote.updatedAt = remoteUpdated || Date.now();
        normalizedRemote.settings = localSettings;
        state = deepMerge(clone(IS_LOCAL_PREVIEW ? SAMPLE_STATE : EMPTY_STATE), normalizedRemote);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        suppressCloudPush = false;
        render();
        updateCloudStatus("已拉取云端最新数据");
        if (showToast) toastMessage("已拉取云端数据");
      } else if (showToast) {
        updateCloudStatus("本地已是最新");
        toastMessage("本地已是最新");
      }
    } catch (error) {
      updateCloudStatus(`拉取失败：${error.message}`, true);
      if (showToast) toastMessage("云同步拉取失败");
    }
  }

  function cloudStatusText() {
    const cloud = state.settings.supabase;
    if (!cloud.enabled) return "云同步已关闭，当前使用本地存储。";
    if (!isCloudConfigured()) {
      return "已开启，但还缺少 Supabase URL、Anon Key、行程 ID 或至少 16 位的共享密钥。";
    }
    return `已配置行程 ${cloud.tripId}，每 12 秒检查一次云端更新。`;
  }

  function updateCloudStatus(message, isError = false) {
    const element = document.getElementById("cloudStatus");
    if (element) {
      element.textContent = message;
      element.style.color = isError ? "var(--danger)" : "";
    }
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    navigator.serviceWorker
      .register("./sw.js?v=22")
      .then((registration) => registration.update())
      .catch((error) => {
        console.warn("Service Worker 注册失败", error);
      });
  }

  function renderWeatherRefreshIndicator() {
    refreshIcons();
  }

  async function refreshWeatherInBackground() {
    if (!state.trip.cities.length) return;
    await refreshWeather(false);
  }

  async function refreshWeather(showToastMessage = false) {
    if (!state.trip.cities.length) {
      if (showToastMessage) toastMessage("请先添加城市");
      return;
    }
    try {
      await Promise.all(state.trip.cities.map((city) => fetchWeatherForCity(city)));
      persist({ skipRender: true, skipCloud: true });
      if (activeTab === "today" || activeTab === "itinerary") render();
      if (showToastMessage) toastMessage("天气已更新");
    } catch (error) {
      if (showToastMessage) toastMessage("天气暂时无法更新");
    }
  }

  async function fetchWeatherForCity(city) {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}` +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
      "&forecast_days=16&timezone=auto";
    const response = await fetch(url);
    if (!response.ok) throw new Error("weather request failed");
    const data = await response.json();
    const cache = {};
    (data.daily?.time || []).forEach((date, index) => {
      cache[date] = {
        code: data.daily.weather_code[index],
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index],
        precipitation: data.daily.precipitation_probability_max[index] ?? 0,
        updatedAt: Date.now()
      };
    });
    updateState((draft) => {
      draft.weatherCache ||= {};
      draft.weatherCache[city.id] = { ...(draft.weatherCache[city.id] || {}), ...cache };
    }, { skipRender: true, skipCloud: true });
  }

  function initializeMap() {
    const container = document.getElementById("map");
    if (!container || !window.L) return;
    if (!map) {
      map = L.map(container, {
        zoomControl: false,
        attributionControl: true,
        preferCanvas: true
      }).setView(
        [
          state.trip.cities[0]?.lat || 35.8617,
          state.trip.cities[0]?.lng || 104.1954
        ],
        state.trip.cities.length ? 12 : 4
      );

      let tileErrors = 0;
      let fallbackAdded = false;
      const primaryTiles = L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);
      primaryTiles.on("tileerror", () => {
        tileErrors += 1;
        if (tileErrors < 3 || fallbackAdded) return;
        fallbackAdded = true;
        map.removeLayer(primaryTiles);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);
      });

      L.control.zoom({ position: "bottomleft" }).addTo(map);
      mapLayers = {
        markers: L.layerGroup().addTo(map),
        routes: L.layerGroup().addTo(map)
      };

      let longPressTimer = null;
      const startLongPress = (event) => {
        const latlng = event.latlng;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          if (map.dragging.moved()) return;
          openActivitySheet(null, {
            date: mapDay === "all" ? getTodayDate() : mapDay,
            lat: Number(latlng.lat.toFixed(6)),
            lng: Number(latlng.lng.toFixed(6))
          });
        }, 620);
      };
      const cancelLongPress = () => clearTimeout(longPressTimer);
      map.on("mousedown touchstart", startLongPress);
      map.on("mouseup touchend dragstart zoomstart", cancelLongPress);
      map.on("contextmenu", (event) => {
        cancelLongPress();
        openActivitySheet(null, {
          date: mapDay === "all" ? getTodayDate() : mapDay,
          lat: Number(event.latlng.lat.toFixed(6)),
          lng: Number(event.latlng.lng.toFixed(6))
        });
      });
      map.on("click", (event) => {
        if (pendingLocationActivityId) {
          const targetId = pendingLocationActivityId;
          pendingLocationActivityId = null;
          document.getElementById("map")?.classList.remove("picking-location");
          updateState((draft) => {
            const activity = draft.activities.find((item) => item.id === targetId);
            if (!activity) return;
            activity.lat = Number(event.latlng.lat.toFixed(6));
            activity.lng = Number(event.latlng.lng.toFixed(6));
          });
          selectedActivityId = targetId;
          refreshMapMarkers();
          renderMapCard();
          toastMessage("位置已补上");
          return;
        }
        if (selectedActivityId) {
          selectedActivityId = null;
          renderMapCard();
        }
      });
    }

    requestAnimationFrame(() => {
      map.invalidateSize();
      refreshMapMarkers();
      bindMapSearch();
      renderMapCard();
    });
  }

  function refreshMapMarkers() {
    if (!map || !mapLayers) return;
    mapLayers.markers.clearLayers();
    mapLayers.routes.clearLayers();

    const dates = tripDates();
    const visibleDates = mapDay === "all" ? dates : [mapDay];
    const activities = state.activities
      .filter((activity) => visibleDates.includes(activity.date))
      .sort((a, b) => a.date.localeCompare(b.date) || compareActivities(a, b));

    const byDate = new Map();
    activities.forEach((activity) => {
      if (!byDate.has(activity.date)) byDate.set(activity.date, []);
      byDate.get(activity.date).push(activity);
    });

    byDate.forEach((list, date) => {
      const day = dayNumberForDate(date) || 1;
      const color = dayColor(day);
      const latlngs = [];
      list.forEach((activity, index) => {
        if (!Number.isFinite(activity.lat) || !Number.isFinite(activity.lng)) return;
        const latlng = [activity.lat, activity.lng];
        latlngs.push(latlng);
        const icon = L.divIcon({
          className: "",
          html: `<div class="number-marker" style="--marker-color:${color}"><span>${index + 1}</span></div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 30]
        });
        const marker = L.marker(latlng, { icon, bubblingMouseEvents: false }).addTo(mapLayers.markers);
        marker.bindTooltip(`${index + 1}. ${activity.name}`, { direction: "top", offset: [0, -26] });
        marker.on("click", () => {
          selectedActivityId = activity.id;
          renderMapCard();
        });
      });
      if (latlngs.length > 1) {
        L.polyline(latlngs, {
          color,
          weight: 4,
          opacity: 0.72,
          dashArray: "8 8"
        }).addTo(mapLayers.routes);
      }
    });

    if (selectedActivityId) renderMapCard();
    fitVisibleMap();
  }

  function fitVisibleMap() {
    if (!map) return;
    const visibleDates = mapDay === "all" ? tripDates() : [mapDay];
    const coords = state.activities
      .filter(
        (activity) =>
          visibleDates.includes(activity.date) &&
          Number.isFinite(activity.lat) &&
          Number.isFinite(activity.lng)
      )
      .map((activity) => [activity.lat, activity.lng]);
    if (!coords.length) return;
    if (coords.length === 1) {
      map.flyTo(coords[0], 15, { duration: 0.6 });
    } else {
      map.fitBounds(L.latLngBounds(coords), { padding: [60, 60], maxZoom: 15, animate: true });
    }
  }

  function setMapDay(day) {
    mapDay = day;
    selectedActivityId = null;
    document.querySelectorAll(".day-pill").forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.day === day);
    });
    refreshMapMarkers();
    renderMapCard();
  }

  function locateUser() {
    if (!map) return;
    toastMessage("正在定位…");
    map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    map.off("locationfound.location-handler");
    map.once("locationfound", (event) => {
      if (userLocationMarker) userLocationMarker.remove();
      userLocationMarker = L.circleMarker(event.latlng, {
        radius: 9,
        color: "#ffffff",
        weight: 3,
        fillColor: "#2563eb",
        fillOpacity: 1
      }).addTo(map);
      toastMessage("已定位到当前位置");
    });
    map.once("locationerror", () => toastMessage("无法获取定位，请检查浏览器权限"));
  }

  function bindMapSearch() {
    const form = view.querySelector('[data-form="map-search"]');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = form.querySelector("input")?.value.trim();
      if (!query) return;
      const results = view.querySelector("#searchResults");
      results.innerHTML = `<div class="search-panel"><div class="search-result">搜索中…</div></div>`;
      try {
        const cityName =
          mapDay === "all"
            ? state.trip.cities[0]?.name || ""
            : cityForDate(mapDay)?.name || "";
        const data = await searchPlaces(query, cityName);
        if (!data.length) {
          results.innerHTML = `
            <div class="search-panel">
              <div class="search-result">
                <strong>没有找到结果</strong>
                <span>可以关闭搜索后长按地图手动选点，或在设置中填写高德搜索 Key。</span>
              </div>
            </div>
          `;
          return;
        }
        results.innerHTML = `
          <div class="search-panel">
            ${data
              .map(
                (item, index) => `
                  <button class="search-result" type="button" data-search-index="${index}">
                    <strong>${escapeHtml(item.name || item.display_name.split(",")[0])}</strong>
                    <span>${escapeHtml(item.display_name)}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        `;
        results.querySelectorAll("[data-search-index]").forEach((button) => {
          button.addEventListener("click", () => {
            const item = data[Number(button.dataset.searchIndex)];
            results.innerHTML = "";
            const lat = Number(item.lat);
            const lng = Number(item.lon);
            map?.flyTo([lat, lng], 16, { duration: 0.6 });
            openActivitySheet(null, {
              date: mapDay === "all" ? getTodayDate() : mapDay,
              name: item.name || item.display_name.split(",")[0],
              lat,
              lng
            });
          });
        });
      } catch (error) {
        results.innerHTML = `<div class="search-panel"><div class="search-result">搜索失败，请稍后重试</div></div>`;
      }
    });
  }

  let amapLoaderPromise = null;

  async function searchPlaces(query, cityName = "") {
    const configuredAmap = getAmapConfig();
    if (configuredAmap.key) {
      try {
        const amapResults = await searchAmap(query, cityName);
        if (amapResults.length) return amapResults;
      } catch (error) {
        console.info("高德搜索不可用，改用免费地图搜索", error);
      }
    }

    const contextualQuery =
      cityName && !query.includes(cityName) ? `${query} ${cityName}` : query;
    const nominatimQueries = [...new Set([contextualQuery, query].filter(Boolean))];
    for (const nominatimQuery of nominatimQueries) {
      const nominatimUrl =
        "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&addressdetails=1&accept-language=zh-CN&q=" +
        encodeURIComponent(nominatimQuery);
      try {
        const nominatimData = await fetchJsonWithTimeout(nominatimUrl, 7000);
        if (nominatimData.length) {
          return nominatimData.map((item) => ({
            name: item.name || item.display_name?.split(",")[0] || query,
            display_name: item.display_name || nominatimQuery,
            lat: Number(item.lat),
            lon: Number(item.lon)
          }));
        }
      } catch (error) {
        console.info("Nominatim 搜索不可用，尝试 Photon", error);
        break;
      }
    }

    const photonUrl = `https://photon.komoot.io/api/?limit=8&q=${encodeURIComponent(contextualQuery)}`;
    const photonData = await fetchJsonWithTimeout(photonUrl, 7000);
    return (photonData.features || []).map((feature) => {
      const props = feature.properties || {};
      const display = [props.name, props.street, props.district, props.city, props.state, props.country]
        .filter(Boolean)
        .join(", ");
      return {
        name: props.name || query,
        display_name: display || query,
        lat: Number(feature.geometry?.coordinates?.[1]),
        lon: Number(feature.geometry?.coordinates?.[0])
      };
    });
  }

  async function searchAmap(query, cityName = "") {
    const amap = getAmapConfig();
    if (!amap?.key) return [];
    await loadAmap(amap.key, amap.securityCode || "");
    const runSearch = (restrictCity) =>
      new Promise((resolve, reject) => {
        const placeSearch = new window.AMap.PlaceSearch({
          pageSize: 10,
          pageIndex: 1,
          citylimit: restrictCity && Boolean(cityName)
        });
        const callback = (status, result) => {
          if (status !== "complete") {
            resolve([]);
            return;
          }
          const pois = result?.poiList?.pois || [];
          resolve(
            pois
              .map((poi) => {
                const lng = Number(poi.location?.lng ?? poi.location?.getLng?.());
                const lat = Number(poi.location?.lat ?? poi.location?.getLat?.());
                const [wgsLng, wgsLat] = gcj02ToWgs84(lng, lat);
                return {
                  name: poi.name || query,
                  display_name:
                    poi.address ||
                    [poi.pname, poi.cityname, poi.adname, poi.address].filter(Boolean).join(""),
                  searchText: [poi.pname, poi.cityname, poi.adname, poi.address, poi.name]
                    .filter(Boolean)
                    .join(" "),
                  lat: wgsLat,
                  lon: wgsLng
                };
              })
              .filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lon))
          );
        };
        try {
          if (restrictCity && cityName) {
            placeSearch.setCity(cityName);
            placeSearch.setCityLimit(true);
          }
          placeSearch.search(query, callback);
        } catch (error) {
          reject(error);
        }
      });

    const cityResults = cityName ? await runSearch(true) : [];
    if (!cityName) return runSearch(false);

    const queryTokens = query
      .split(/[\s,，。·|/]+/)
      .map((token) =>
        token
          .replace(/(附近|旁边|周边|地铁旁|地铁站|地铁口)+$/g, "")
          .trim()
          .toLowerCase()
      )
      .filter((token) => token.length >= 2);
    const scoreResult = (item) => {
      const haystack = [item.name, item.display_name, item.searchText]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return queryTokens.filter((token) => haystack.includes(token)).length;
    };
    const cityScore = cityResults.length
      ? Math.max(...cityResults.map(scoreResult))
      : -1;
    if (!queryTokens.length || cityScore === queryTokens.length) return cityResults;

    const nationwideResults = await runSearch(false);
    const nationwideScore = nationwideResults.length
      ? Math.max(...nationwideResults.map(scoreResult))
      : -1;
    if (nationwideScore > cityScore) return nationwideResults;
    return cityResults.length ? cityResults : nationwideResults;
  }

  function outOfChina(lng, lat) {
    return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
  }

  function transformLatitude(x, y) {
    let value =
      -100 +
      2 * x +
      3 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    value +=
      ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
    value +=
      ((20 * Math.sin(y * Math.PI) + 40 * Math.sin((y / 3) * Math.PI)) * 2) / 3;
    value +=
      ((160 * Math.sin((y / 12) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30)) * 2) /
      3;
    return value;
  }

  function transformLongitude(x, y) {
    let value =
      300 +
      x +
      2 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    value +=
      ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
    value +=
      ((20 * Math.sin(x * Math.PI) + 40 * Math.sin((x / 3) * Math.PI)) * 2) / 3;
    value +=
      ((150 * Math.sin((x / 12) * Math.PI) + 300 * Math.sin((x / 30) * Math.PI)) * 2) /
      3;
    return value;
  }

  function gcj02ToWgs84(lng, lat) {
    if (!Number.isFinite(lng) || !Number.isFinite(lat) || outOfChina(lng, lat)) {
      return [lng, lat];
    }
    const earthAxis = 6378245;
    const eccentricity = 0.00669342162296594323;
    let deltaLat = transformLatitude(lng - 105, lat - 35);
    let deltaLng = transformLongitude(lng - 105, lat - 35);
    const radLat = (lat / 180) * Math.PI;
    let magic = Math.sin(radLat);
    magic = 1 - eccentricity * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    deltaLat =
      (deltaLat * 180) / (((earthAxis * (1 - eccentricity)) / (magic * sqrtMagic)) * Math.PI);
    deltaLng = (deltaLng * 180) / ((earthAxis / sqrtMagic) * Math.cos(radLat) * Math.PI);
    return [lng - deltaLng, lat - deltaLat];
  }

  function getAmapConfig() {
    return {
      key: state.settings.amap?.key || window.TRIP_AMAP_CONFIG?.key || "",
      securityCode:
        state.settings.amap?.securityCode ||
        window.TRIP_AMAP_CONFIG?.securityCode ||
        ""
    };
  }

  function loadAmap(key, securityCode) {
    if (window.AMap?.PlaceSearch) return Promise.resolve();
    if (amapLoaderPromise) return amapLoaderPromise;
    window._AMapSecurityConfig = securityCode ? { securityJsCode: securityCode } : {};
    amapLoaderPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(
        key
      )}&plugin=AMap.PlaceSearch`;
      script.async = true;
      script.onload = () => {
        if (window.AMap?.PlaceSearch) resolve();
        else reject(new Error("高德地图加载完成，但没有 PlaceSearch 插件"));
      };
      script.onerror = () => reject(new Error("高德地图加载失败"));
      document.head.appendChild(script);
    });
    return amapLoaderPromise;
  }

  async function fetchJsonWithTimeout(url, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function estimateTransportMinutes(from, to, mode) {
    if (!from || !Number.isFinite(from.lat) || !Number.isFinite(from.lng)) return null;
    if (!Number.isFinite(to.lat) || !Number.isFinite(to.lng)) {
      toastMessage("填写经纬度后才能估算");
      return null;
    }
    if (state.settings.orsKey) {
      try {
        const profile = mode === "walk" ? "foot-walking" : mode === "drive" ? "driving-car" : "driving-car";
        const response = await fetch(`https://api.openrouteservice.org/v2/directions/${profile}`, {
          method: "POST",
          headers: {
            Authorization: state.settings.orsKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            coordinates: [
              [from.lng, from.lat],
              [to.lng, to.lat]
            ]
          })
        });
        if (!response.ok) throw new Error("ORS failed");
        const data = await response.json();
        return Math.max(1, Math.round(data.routes[0].summary.duration / 60));
      } catch (error) {
        toastMessage("ORS 估算失败，已改用直线距离");
      }
    }
    const km = haversineKm(from.lat, from.lng, to.lat, to.lng);
    const speed = TRANSPORT[mode]?.speed || 20;
    return Math.max(3, Math.round((km / speed) * 60 + (mode === "transit" ? 8 : 3)));
  }

  function haversineKm(lat1, lng1, lat2, lng2) {
    const radius = 6371;
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  async function generateDescription(name) {
    const ai = state.settings.ai;
    if (!ai.apiKey) throw new Error("先在设置中填写 API Key");
    const base = ai.baseUrl.replace(/\/$/, "");
    const endpoint =
      /\/v\d+$/.test(base) || base.includes("deepseek.com")
        ? `${base}/chat/completions`
        : `${base}/v1/chat/completions`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ai.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: ai.model || "deepseek-flash",
        messages: [
          {
            role: "system",
            content: "你是旅行指南编辑。用中文写 1-2 句简洁、具体的地点简介，不夸张，不超过 70 字。"
          },
          { role: "user", content: `地点：${name}` }
        ],
        temperature: 0.5,
        max_tokens: 120
      })
    });
    if (!response.ok) throw new Error("AI 请求失败，请检查 API 配置");
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("AI 没有返回简介");
    return text;
  }
})();
