import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Tree } from "react-d3-tree";
import "./family-tree.css";

const data = [
  {
    "id": "somali_root",
    "name": "Somali Clan Families",
    "type": "root",
    "meta": {
      "description": "High-level clan-family structure for Somali people.",
      "notes": "Based on World Bank 2005 lineage charts + academic sources; simplified for web visualization. Real clan trees can differ slightly by source and region."
    },
    "children": [
      {
        "id": "dir",
        "name": "Dir",
        "type": "clan-family",
        "meta": {
          "aliases": ["Dir"],
          "regions": ["Somaliland (northwest Somalia)", "eastern Ethiopia (Harar, Dire Dawa, Somali Region)", "Djibouti"],
          "language": "Somali (Maxaa-tiri)",
          "notes": "Ancient northern Somali clan-family; includes Issa and Gadabuursi who are major populations in Djibouti and Awdal/Harar regions."
        },
        "children": [
          {
            "id": "dir_gadabuursi",
            "name": "Gadabuursi (Samaroon)",
            "type": "clan",
            "meta": {
              "regions": ["Somaliland – Awdal Region (Borama, Zeila, Baki)", "Ethiopia – Somali Region (Awbare, Dembel, Harrawa valley)", "Djibouti"],
              "notes": "Large Dir sub-clan; often called Samaroon. Historically linked to Harar and local sultanates."
            },
            "children": [
              {
                "id": "dir_gadabuursi_habar_makadur",
                "name": "Habar Makadur",
                "type": "clan-section",
                "meta": {
                  "notes": "One of the two main Gadabuursi divisions."
                },
                "children": [
                  { "id": "dir_gadabuursi_mahad_ase", "name": "Mahad 'Ase", "type": "subclan" },
                  { "id": "dir_gadabuursi_makahil", "name": "Makahil", "type": "subclan" }
                ]
              },
              {
                "id": "dir_gadabuursi_habar_affan",
                "name": "Habar 'Affan",
                "type": "clan-section",
                "meta": {
                  "notes": "Second main Gadabuursi division; includes several diya-paying groups."
                }
              }
            ]
          },
          {
            "id": "dir_issa",
            "name": "Issa",
            "type": "clan",
            "meta": {
              "regions": ["Djibouti (majority of population)", "Ethiopia – Sitti Zone", "northwest Somalia"],
              "notes": "Predominant Somali group in Djibouti; historically involved in trade and pastoralism across Djibouti–Somaliland–Ethiopia corridor."
            }
          },
          {
            "id": "dir_biimaal",
            "name": "Biimaal",
            "type": "clan",
            "meta": {
              "regions": ["Southern Somalia – Lower Shabelle coast (Merca, etc.)"],
              "notes": "Coastal Dir clan known historically for resistance against colonial rule around Merca."
            }
          },
          {
            "id": "dir_surre",
            "name": "Surre",
            "type": "clan",
            "meta": {
              "regions": ["Central Somalia", "Somali Region of Ethiopia"],
              "notes": "Dir sub-clan with Abdalle and Qubeys branches; genealogies sometimes debated in modern genetic work."
            }
          },
          {
            "id": "dir_gurgura",
            "name": "Gurgura",
            "type": "clan",
            "meta": {
              "regions": ["Around Harar and Dire Dawa (Ethiopia)"],
              "notes": "Dir-affiliated group historically important in Harar region."
            }
          },
          {
            "id": "dir_garre",
            "name": "Garre (Quranyow)",
            "type": "clan",
            "meta": {
              "regions": ["Southern Ethiopia", "southwest Somalia", "north-eastern Kenya"],
              "notes": "Multi-regional pastoral and agro-pastoral Dir-derived group; sometimes treated as Digil/Rahanweyn in southern contexts."
            }
          },
          {
            "id": "dir_others",
            "name": "Other Dir branches",
            "type": "group",
            "meta": {
              "notes": "Includes Gurre, Garrire, Bajimal, Barsuug and smaller Dir lineages found across Somali-inhabited regions."
            },
            "children": [
              { "id": "dir_gurre", "name": "Gurre", "type": "clan" },
              { "id": "dir_garrire", "name": "Garrire", "type": "clan" },
              { "id": "dir_bajimal", "name": "Bajimal", "type": "clan" },
              { "id": "dir_barsuug", "name": "Barsuug", "type": "clan" }
            ]
          }
        ]
      },

      {
        "id": "isaaq",
        "name": "Isaaq",
        "type": "clan-family",
        "meta": {
          "regions": ["Somaliland (Hargeisa, Berbera, Burao, etc.)", "Ethiopia – Somali Region", "Djibouti"],
          "language": "Somali (Maxaa-tiri)",
          "aliases": ["Isaaq", "Isahq"],
          "notes": "Major northern clan-family claiming descent from Sheikh Ishaaq bin Ahmed; internally divided into Habr Magaadle and Habr Habuusheed uterine alliances."
        },
        "children": [
          {
            "id": "isaaq_habr_magaadle",
            "name": "Habr Magaadle",
            "type": "uterine-confederation",
            "children": [
              {
                "id": "isaaq_habr_awal",
                "name": "Habr Awal (Abdirahman)",
                "type": "clan",
                "meta": {
                  "regions": ["Somaliland – around Hargeisa and Berbera"],
                  "notes": "Large Isaaq clan historically dominant in trade via Berbera and Djibouti."
                }
              },
              {
                "id": "isaaq_arap",
                "name": "Arap (Muhammad)",
                "type": "clan",
                "meta": {
                  "regions": ["Somaliland – interior around Hargeisa/Burao"],
                  "notes": "Arap often politically allied with other Isaaq sub-clans; pastoral and semi-urban."
                }
              },
              {
                "id": "isaaq_habr_garhajis",
                "name": "Habr Garhajis (Ismail)",
                "type": "clan",
                "meta": {
                  "regions": ["Somaliland – around Hargeisa, Togdheer, Sanaag"],
                  "notes": "Includes Habr Yunis and Eidagale branches; associated with leadership and politics in Isaaq oral tradition."
                },
                "children": [
                  { "id": "isaaq_habr_yunis", "name": "Habr Yunis", "type": "subclan" },
                  { "id": "isaaq_eidagale", "name": "Eidagale", "type": "subclan" }
                ]
              },
              {
                "id": "isaaq_ayub",
                "name": "Ayub",
                "type": "clan",
                "meta": {
                  "notes": "Smaller Isaaq sub-clan, historically part of Habr Magaadle bloc."
                }
              }
            ]
          },
          {
            "id": "isaaq_habr_habuusheed",
            "name": "Habr Habuusheed",
            "type": "uterine-confederation",
            "children": [
              {
                "id": "isaaq_tol_jeelo",
                "name": "Tol Je'lo (Ahmed)",
                "type": "clan",
                "meta": {
                  "regions": ["Eastern Somaliland (Togdheer/Sanaag)", "Somali Region of Ethiopia"],
                  "notes": "Eldest son in Isaaq tradition; historically produced sultans before modern era."
                }
              },
              {
                "id": "isaaq_habr_jeclo",
                "name": "Habr Je'lo (Muuse)",
                "type": "clan",
                "meta": {
                  "regions": ["Somaliland – Togdheer, Sahil, Sanaag coastline", "Somali Region of Ethiopia", "Kenya (Isahakia community)"],
                  "notes": "Large Isaaq clan with pastoral and coastal trading history; internally divided into Mohamed Abokor, Musa Abokor, Samane Abokor, Reer Dood and Omar."
                },
                "children": [
                  {
                    "id": "isaaq_habr_jeclo_mohamed_abokor",
                    "name": "Mohamed Abokor",
                    "type": "subclan",
                    "meta": {
                      "regions": ["Togdheer, Sool, Sahil (Somaliland)", "Somali Region of Ethiopia", "Isiolo (Kenya)"],
                      "notes": "One of the largest Habr Je'lo branches; includes several diya-paying groups used in customary law."
                    },
                    "children": [
                      { "id": "isaaq_mohamed_abokor_aadan_madoobe", "name": "Aadan Madoobe", "type": "lineage" },
                      { "id": "isaaq_mohamed_abokor_yeesif", "name": "Yeesif", "type": "lineage" },
                      { "id": "isaaq_mohamed_abokor_reer_daahir", "name": "Reer Daahir", "type": "lineage" },
                      { "id": "isaaq_mohamed_abokor_solomadow", "name": "Solomadow", "type": "lineage" },
                      { "id": "isaaq_mohamed_abokor_ahmed_farah", "name": "Ahmed Farah", "type": "lineage" }
                    ]
                  },
                  {
                    "id": "isaaq_habr_jeclo_musa_abokor",
                    "name": "Musa Abokor",
                    "type": "subclan"
                  },
                  {
                    "id": "isaaq_habr_jeclo_samane_abokor",
                    "name": "Samane Abokor",
                    "type": "subclan"
                  },
                  {
                    "id": "isaaq_habr_jeclo_reer_dood",
                    "name": "Reer Dood",
                    "type": "subclan"
                  },
                  {
                    "id": "isaaq_habr_jeclo_omar",
                    "name": "Omar",
                    "type": "subclan"
                  }
                ]
              },
              {
                "id": "isaaq_sanbur",
                "name": "Sanbur (Ibrahim)",
                "type": "clan",
                "meta": {
                  "regions": ["Somaliland", "part of Habr Habusheed confederation"],
                  "notes": "Isaaq-Dir related group often politically associated with Habr Je'lo."
                }
              },
              {
                "id": "isaaq_ibran",
                "name": "Ibran / Cimraan (Muhammad)",
                "type": "clan",
                "meta": {
                  "notes": "Smaller Habr Habuusheed clan closely tied to Tol Je'lo and Habr Je'lo in the Habr Habusheed bloc."
                }
              }
            ]
          }
        ]
      },

      {
        "id": "darod",
        "name": "Darod",
        "type": "clan-family",
        "meta": {
          "regions": ["Northern Somalia (Puntland, eastern Somaliland)", "southern Somalia (Gedo, Jubba regions)", "Ethiopia – Somali Region (Ogaden)", "northeastern Kenya"],
          "language": "Somali (Maxaa-tiri)",
          "notes": "One of the largest Somali clan-families by territory and population; clan tree below is simplified from World Bank 2005 lineage charts and later summaries."
        },
        "children": [
          {
            "id": "darod_harti",
            "name": "Harti",
            "type": "clan-confederation",
            "meta": {
              "regions": ["Puntland (Bari, Nugal, northern Mudug)", "eastern Somaliland (Sool, Sanaag)", "Somali Region of Ethiopia"],
              "notes": "Northern Darod bloc that historically dominated coastal trade and politics in the north."
            },
            "children": [
              {
                "id": "darod_majeerteen",
                "name": "Majeerteen",
                "type": "clan",
                "meta": {
                  "regions": ["Puntland (Bari, Nugal, parts of Mudug)"],
                  "notes": "Produced several sultanates and modern political leaders."
                }
              },
              {
                "id": "darod_dhulbahante",
                "name": "Dhulbahante",
                "type": "clan",
                "meta": {
                  "regions": ["Sool, eastern Togdheer, parts of Sanaag"],
                  "notes": "Pastoral clan central in Darawiish resistance history."
                }
              },
              {
                "id": "darod_warsangali",
                "name": "Warsangali",
                "type": "clan",
                "meta": {
                  "regions": ["Eastern Sanaag coast (Las Qoray, etc.)"],
                  "notes": "Coastal sultanate with maritime trade history."
                }
              },
              {
                "id": "darod_dishiishe",
                "name": "Dishiishe",
                "type": "clan",
                "meta": {
                  "regions": ["Northeastern Somalia coast"],
                  "notes": "Smaller Harti clan along the coast."
                }
              }
            ]
          },
          {
            "id": "darod_marehan",
            "name": "Marehan",
            "type": "clan",
            "meta": {
              "regions": ["Gedo Region", "parts of Galguduud, Mudug, and Somali Region (Ethiopia)"],
              "notes": "Key Darod clan involved in 16th-century Adal campaigns and modern Somali politics."
            }
          },
          {
            "id": "darod_absame",
            "name": "Absame (Ogaden & related)",
            "type": "clan-confederation",
            "meta": {
              "regions": ["Ethiopia – vast Ogaden area", "southern Somalia (Jubbaland)", "northeastern Kenya"],
              "notes": "Ogaden is the largest Absame branch; others include Jidwaaq groupings."
            },
            "children": [
              {
                "id": "darod_ogaden",
                "name": "Ogaden",
                "type": "clan"
              },
              {
                "id": "darod_jidwaaq",
                "name": "Jidwaaq",
                "type": "clan",
                "children": [
                  { "id": "darod_jidwaaq_abaskuul", "name": "Abaskuul", "type": "subclan" },
                  { "id": "darod_jidwaaq_bartire", "name": "Bartire", "type": "subclan" },
                  { "id": "darod_jidwaaq_yabarre", "name": "Yabarre", "type": "subclan" }
                ]
              }
            ]
          },
          {
            "id": "darod_leelkase",
            "name": "Leelkase (Tanade)",
            "type": "clan",
            "meta": {
              "regions": ["Mudug (Galkayo, Galdogob)", "Nugal", "Bari", "Bay and Lower Juba regions"],
              "notes": "Sub-clan of Tanade Darod; important communities in Puntland and central Somalia."
            }
          },
          {
            "id": "darod_awrtable",
            "name": "Awrtable (Yusuf)",
            "type": "clan",
            "meta": {
              "regions": ["Puntland and central Somalia"],
              "notes": "Smaller but historically influential Darod clan."
            }
          }
        ]
      },

      {
        "id": "hawiye",
        "name": "Hawiye",
        "type": "clan-family",
        "meta": {
          "regions": ["Central & southern Somalia (Mogadishu, Hiran, Galguduud, Mudug)", "Somali Region of Ethiopia", "Djibouti", "Kenya (Wajir, Mandera)"],
          "language": "Somali (Maxaa-tiri)",
          "notes": "Large clan-family tracing descent from Sheikh Ahmed (Hawiye); major urban presence in Mogadishu and central regions."
        },
        "children": [
          {
            "id": "hawiye_hiraab",
            "name": "Hiraab",
            "type": "clan-confederation",
            "meta": {
              "notes": "Political-military confederation under Gorgaarte branch of Hawiye; historically ruled Hiraab Imamate controlling Mogadishu–Hobyo corridor."
            },
            "children": [
              {
                "id": "hawiye_mudulood",
                "name": "Mudulood",
                "type": "clan",
                "children": [
                  {
                    "id": "hawiye_abgaal",
                    "name": "Abgaal",
                    "type": "subclan",
                    "meta": {
                      "regions": ["Mogadishu and surroundings", "Middle Shabelle"],
                      "notes": "Highly influential clan in Somali politics; produced several presidents and the 'father' of Somali military."
                    }
                  },
                  { "id": "hawiye_wacdaan", "name": "Wacdaan", "type": "subclan" },
                  { "id": "hawiye_udejeen", "name": "Udeejeen", "type": "subclan" }
                ]
              },
              {
                "id": "hawiye_habar_gidir",
                "name": "Habar Gidir",
                "type": "clan",
                "meta": {
                  "regions": ["Central Somalia – especially Galguduud and Mudug", "Mogadishu districts"],
                  "notes": "Key Hiraab subclan; includes lineages active in recent Somali politics and conflicts."
                },
                "children": [
                  { "id": "hawiye_hg_sacad", "name": "Sacad", "type": "subclan" },
                  { "id": "hawiye_hg_ayr", "name": "Ayr", "type": "subclan" },
                  { "id": "hawiye_hg_saleebaan", "name": "Saleebaan", "type": "subclan" },
                  { "id": "hawiye_hg_saruur", "name": "Saruur", "type": "subclan" }
                ]
              },
              {
                "id": "hawiye_duduble",
                "name": "Duduble",
                "type": "clan",
                "meta": {
                  "regions": ["Central and southern Somalia"],
                  "notes": "Gorgaarte/Hiraab branch with pastoral and agro-pastoral communities."
                }
              }
            ]
          },
          {
            "id": "hawiye_murusade",
            "name": "Murusade",
            "type": "clan",
            "meta": {
              "regions": ["Around Mogadishu and central regions"],
              "notes": "Distinct Hawiye clan historically allied and at times in tension with other Hiraab groups."
            }
          },
          {
            "id": "hawiye_gaaljecel",
            "name": "Gaaljecel (Saransoor)",
            "type": "clan",
            "meta": {
              "regions": ["Hiran (Beledweyne)", "parts of central Somalia"],
              "notes": "Sometimes grouped under Saransoor/Hawiye lineages; strong presence along Shabelle valley."
            }
          },
          {
            "id": "hawiye_hawadle",
            "name": "Hawadle",
            "type": "clan",
            "meta": {
              "regions": ["Hiran (Beledweyne)", "Middle Shabelle"],
              "notes": "Samatalis branch in Hawiye genealogies."
            }
          },
          {
            "id": "hawiye_degodia",
            "name": "Degodia",
            "type": "clan",
            "meta": {
              "regions": ["Somali Region of Ethiopia", "northeastern Kenya (Wajir)", "southern Somalia"],
              "notes": "Large cross-border Hawiye/Saransoor clan."
            }
          },
          {
            "id": "hawiye_ajuran",
            "name": "Ajuran",
            "type": "clan",
            "meta": {
              "regions": ["Middle & Lower Shabelle, Hiran"],
              "notes": "Once headed the powerful Ajuran Sultanate ruling large areas of southern Somalia."
            }
          }
        ]
      },

      {
        "id": "rahanweyn",
        "name": "Rahanweyn (Digil & Mirifle)",
        "type": "clan-family",
        "meta": {
          "regions": ["Southern Somalia – Bay, Bakool, Lower Shabelle, Middle & Lower Jubba"],
          "language": "Somali – Maay dialects",
          "aliases": ["Raxanweyn", "Reewin", "Digil iyo Mirifle"],
          "notes": "Agro-pastoral clan-family speaking Maay dialects; traditionally associated with inter-riverine farming zones between Jubba and Shabelle rivers."
        },
        "children": [
          {
            "id": "rahanweyn_digil",
            "name": "Digil",
            "type": "sub-family",
            "meta": {
              "notes": "Coastal and riverine lineages; often farmers and fisher-folk."
            },
            "children": [
              { "id": "rahanweyn_digil_geledi", "name": "Geledi", "type": "clan" },
              { "id": "rahanweyn_digil_tunni", "name": "Tunni", "type": "clan" },
              { "id": "rahanweyn_digil_jiddu", "name": "Jiddu", "type": "clan" },
              { "id": "rahanweyn_digil_garre", "name": "Garre (Digil branch)", "type": "clan" },
              { "id": "rahanweyn_digil_begedi", "name": "Begedi / Bagadi", "type": "clan" },
              { "id": "rahanweyn_digil_dabarre", "name": "Dabarre", "type": "clan" },
              { "id": "rahanweyn_digil_shanta_caleemood", "name": "Shanta Caleemood", "type": "clan-group" }
            ]
          },
          {
            "id": "rahanweyn_mirifle",
            "name": "Mirifle",
            "type": "sub-family",
            "meta": {
              "notes": "Mirifle lineages are often divided into the Sagaal ('nine') and Sideed ('eight') groups."
            },
            "children": [
              {
                "id": "rahanweyn_mirifle_sagaal",
                "name": "Sagaal",
                "type": "clan-group",
                "children": [
                  { "id": "rahanweyn_mirifle_jilible", "name": "Jilible", "type": "clan" },
                  { "id": "rahanweyn_mirifle_gasaargude", "name": "Gasaargude", "type": "clan" },
                  { "id": "rahanweyn_mirifle_gawaweyn", "name": "Gawaweyn", "type": "clan" },
                  { "id": "rahanweyn_mirifle_geeladle", "name": "Geeladle", "type": "clan" },
                  { "id": "rahanweyn_mirifle_luwaay", "name": "Luwaay", "type": "clan" },
                  { "id": "rahanweyn_mirifle_hadame", "name": "Hadame", "type": "clan" },
                  { "id": "rahanweyn_mirifle_yantaar", "name": "Yantaar", "type": "clan" },
                  { "id": "rahanweyn_mirifle_hubeer", "name": "Hubeer", "type": "clan" },
                  { "id": "rahanweyn_mirifle_eyle", "name": "Eyle", "type": "clan" }
                ]
              },
              {
                "id": "rahanweyn_mirifle_sideed",
                "name": "Sideed",
                "type": "clan-group",
                "children": [
                  { "id": "rahanweyn_mirifle_leysan", "name": "Leysan", "type": "clan" },
                  { "id": "rahanweyn_mirifle_hariin", "name": "Hariin", "type": "clan" },
                  { "id": "rahanweyn_mirifle_eelay", "name": "Eelay", "type": "clan" },
                  { "id": "rahanweyn_mirifle_jiroon", "name": "Jiroon", "type": "clan" },
                  { "id": "rahanweyn_mirifle_waanqel", "name": "Waanjel", "type": "clan" }
                ]
              }
            ]
          }
        ]
      },

      {
        "id": "somali_minorities",
        "name": "Minority & occupational groups",
        "type": "category",
        "meta": {
          "notes": "Non-major clans and low-caste/occupational groups often present in many towns and regions; not a single common ancestor tree."
        },
        "children": [
          { "id": "minor_benadiri", "name": "Benadiri / Reer Hamar", "type": "urban-merchant-group" },
          { "id": "minor_madhiban", "name": "Madhiban (Gaboye)", "type": "occupational-group" },
          { "id": "minor_yibir", "name": "Yibir", "type": "occupational-group" },
          { "id": "minor_tumal", "name": "Tumaal", "type": "occupational-group" },
          { "id": "minor_ashraaf", "name": "Ashraaf", "type": "religious-lineage" }
        ]
      }
    ]
  }
];

const NODE_TYPE_COLORS = {
  root: "#fbbf24",
  "clan-family": "#f97316",
  clan: "#60a5fa",
  subclan: "#34d399",
  "clan-section": "#a78bfa",
  group: "#f472b6",
  category: "#cbd5f5",
  "uterine-confederation": "#7dd3fc",
  "clan-confederation": "#c084fc",
  "sub-family": "#fb7185",
  "clan-group": "#38bdf8",
  lineage: "#facc15",
  "urban-merchant-group": "#93c5fd",
  "occupational-group": "#f472b6",
  "religious-lineage": "#fcd34d",
  default: "#94a3b8",
};

const SCALE_EXTENT = { min: 0.5, max: 1.8 };

const formatTypeLabel = (type = "clan") =>
  type
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const truncateText = (text = "", limit = 120) =>
  text.length > limit ? `${text.slice(0, limit).trim()}…` : text;

const buildNodeIndex = (root) => {
  const list = [];
  const map = {};

  const traverse = (node, ancestors = []) => {
    const currentPath = [...ancestors, node];
    const entry = {
      id: node.id,
      name: node.name,
      type: node.type,
      meta: node.meta || {},
      node,
      path: currentPath,
      parentId: ancestors.length ? ancestors[ancestors.length - 1].id : null,
    };
    list.push(entry);
    map[node.id] = entry;

    (node.children || []).forEach((child) => traverse(child, currentPath));
  };

  traverse(root);
  return { nodeList: list, nodeMap: map };
};

const Sidebar = ({
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectResult,
  filters,
  onToggleFilter,
  legendItems,
}) => (
  <aside className="sidebar">
    <div className="sidebar__header">
      <h1>Somali Clan Families</h1>
      <p>
        Browse genealogies, regional footprints, and custom notes for major Somali
        clan families. Use search, filters, and the legend to orient yourself.
      </p>
    </div>

    <div className="sidebar__section">
      <label htmlFor="clan-search">Search clans &amp; subclans</label>
      <input
        id="clan-search"
        type="search"
        value={searchQuery}
        placeholder="Search by name (e.g., Habr, Ogaden)"
        onChange={(event) => onSearchChange(event.target.value)}
      />
      {searchQuery && (
        searchResults.length > 0 ? (
          <ul className="sidebar__search-results">
            {searchResults.map((result) => (
              <li key={result.id}>
                <button type="button" onClick={() => onSelectResult(result.id)}>
                  <span>{result.name}</span>
                  <span className="pill pill--soft">
                    {formatTypeLabel(result.type || "clan")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="sidebar__no-results">No clan found</div>
        )
      )}
    </div>

    <div className="sidebar__section">
      <h2>Clan-family filters</h2>
      <div className="sidebar__filters">
        {filters.map((filter) => (
          <label key={filter.id} className="sidebar__checkbox">
            <input
              type="checkbox"
              checked={filter.active}
              onChange={() => onToggleFilter(filter.id)}
            />
            <span>{filter.label}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="sidebar__section">
      <h2>Legend</h2>
      <div className="sidebar__legend">
        {legendItems.map((item) => (
          <div key={item.type} className="legend__item">
            <span
              className="legend__swatch"
              style={{ backgroundColor: item.color }}
            />
            <span>{formatTypeLabel(item.type)}</span>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

const DetailsPanel = ({ node, breadcrumbs, onChildSelect }) => {
  if (!node) {
    return (
      <aside className="details-panel">
        <p className="details-panel__empty">Select a clan to view its story.</p>
      </aside>
    );
  }

  const metaEntries = Object.entries(node.meta || {});
  const childCount = node.children ? node.children.length : 0;

  return (
    <aside className="details-panel">
      <div className="details-panel__header">
        <h2>{node.name}</h2>
        <span className="pill">
          {formatTypeLabel(node.type || "clan")}
        </span>
      </div>
      {breadcrumbs?.length > 0 && (
        <div className="details-panel__breadcrumbs">
          {breadcrumbs.join(" / ")}
        </div>
      )}
      <div className="details-panel__meta">
        {metaEntries.length === 0 && (
          <p className="details-panel__empty">No metadata available.</p>
        )}
        {metaEntries.map(([key, value]) => (
          value ? (
            <div key={key} className="details-panel__meta-item">
              <span className="details-panel__meta-label">
                {formatTypeLabel(key)}
              </span>
              <div className="details-panel__meta-value">
                {Array.isArray(value) ? (
                  <ul>
                    {value.map((entry, index) => (
                      <li key={`${key}-${index}`}>{entry}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            </div>
          ) : null
        ))}
      </div>
      <div className="details-panel__children">
        <h3>Direct descendants ({childCount})</h3>
        {childCount === 0 ? (
          <p className="details-panel__empty">No direct descendants listed.</p>
        ) : (
          <div className="details-panel__children-list">
            {node.children.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => onChildSelect(child.id)}
              >
                {child.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

const NodeCard = ({
  nodeDatum,
  toggleNode,
  onNodeClick,
  isSelected,
  isHighlighted,
}) => {
  const meta = nodeDatum.meta || {};
  const firstRegion = meta.regions?.[0];
  const notes = truncateText(meta.notes || meta.description || "", 90);
  const color = NODE_TYPE_COLORS[nodeDatum.type] || NODE_TYPE_COLORS.default;

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onNodeClick(event);
    }
  };

  return (
    <g className="node-card-wrapper">
      <foreignObject width={200} height={110} x={-100} y={-55}>
        <div
          role="button"
          tabIndex={0}
          className={`node-card${isSelected ? " node-card--selected" : ""}${
            isHighlighted ? " node-card--highlighted" : ""
          }`}
          style={{ "--node-color": color }}
          onClick={onNodeClick}
          onKeyDown={handleKeyDown}
          onDoubleClick={(event) => {
            event.stopPropagation();
            toggleNode();
          }}
        >
          <div className="node-card__header">
            <p className="node-card__title" title={nodeDatum.name}>
              {nodeDatum.name}
            </p>
            <span className="pill pill--compact">
              {formatTypeLabel(nodeDatum.type || "clan")}
            </span>
          </div>
          {firstRegion && (
            <p className="node-card__region">{firstRegion}</p>
          )}
          {notes && (
            <p className="node-card__notes" title={meta.notes || meta.description}>
              {notes}
            </p>
          )}
          <div className="node-card__tooltip">
            {firstRegion && <span>{firstRegion}</span>}
            {meta.notes && <span>{truncateText(meta.notes, 150)}</span>}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

const TreeControls = ({ onZoomIn, onZoomOut, onReset }) => (
  <div className="tree-controls">
    <button type="button" onClick={onZoomIn} aria-label="Zoom in">
      +
    </button>
    <button type="button" onClick={onZoomOut} aria-label="Zoom out">
      −
    </button>
    <button type="button" onClick={onReset} aria-label="Reset view">
      Reset
    </button>
  </div>
);

const ClanTree = ({
  data,
  translate,
  zoom,
  dimensions,
  onNodeClick,
  onUpdate,
  registerNodePosition,
  selectedNodeId,
  highlightedNodeId,
  onZoomIn,
  onZoomOut,
  onReset,
  treeRef,
}) => (
  <div className="tree-surface">
    <Tree
      ref={treeRef}
      data={data}
      translate={translate}
      zoom={zoom}
      dimensions={dimensions}
      zoomable
      draggable
      scaleExtent={SCALE_EXTENT}
      separation={{ siblings: 1.1, nonSiblings: 1.4 }}
      pathFunc="diagonal"
      nodeSize={{ x: 220, y: 140 }}
      orientation="vertical"
      onNodeClick={onNodeClick}
      onUpdate={onUpdate}
      transitionDuration={600}
      centeringTransitionDuration={600}
      renderCustomNodeElement={({
        nodeDatum,
        toggleNode,
        onNodeClick: handleClick,
        hierarchyPointNode,
      }) => {
        registerNodePosition(nodeDatum.id, hierarchyPointNode);
        return (
          <NodeCard
            nodeDatum={nodeDatum}
            toggleNode={toggleNode}
            onNodeClick={handleClick}
            isSelected={selectedNodeId === nodeDatum.id}
            isHighlighted={highlightedNodeId === nodeDatum.id}
          />
        );
      }}
    />
    <TreeControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} onReset={onReset} />
  </div>
);

const FamilyTree = () => {
  const rootNode = data[0];
  const { nodeList, nodeMap } = useMemo(() => buildNodeIndex(rootNode), [rootNode]);

  const initialFilters = useMemo(() => {
    const config = {};
    (rootNode.children || []).forEach((child) => {
      config[child.id] = true;
    });
    return config;
  }, [rootNode]);

  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(rootNode.id);
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.85);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [pendingFocusId, setPendingFocusId] = useState(null);

  const wrapperRef = useRef(null);
  const treeRef = useRef(null);
  const nodePositionsRef = useRef({});
  const highlightTimeout = useRef(null);

  const filteredTreeData = useMemo(() => {
    const allowedChildren = (rootNode.children || []).filter(
      (child) => activeFilters[child.id]
    );
    return [
      {
        ...rootNode,
        children: allowedChildren,
      },
    ];
  }, [rootNode, activeFilters]);

  const filters = useMemo(
    () =>
      (rootNode.children || []).map((child) => ({
        id: child.id,
        label: child.name,
        active: Boolean(activeFilters[child.id]),
      })),
    [rootNode, activeFilters]
  );

  const legendItems = useMemo(() => {
    const seen = new Set();
    const entries = [];
    nodeList.forEach((entry) => {
      const type = entry.type || "clan";
      if (!seen.has(type)) {
        seen.add(type);
        entries.push({
          type,
          color: NODE_TYPE_COLORS[type] || NODE_TYPE_COLORS.default,
        });
      }
    });
    return entries;
  }, [nodeList]);

  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    const query = searchQuery.toLowerCase();
    return nodeList
      .filter((entry) => entry.name.toLowerCase().includes(query))
      .slice(0, 12);
  }, [searchQuery, nodeList]);

  const selectedEntry = nodeMap[selectedNodeId] || nodeMap[rootNode.id];
  const selectedNode = selectedEntry ? selectedEntry.node : rootNode;
  const breadcrumbs = selectedEntry?.path.map((node) => node.name) || [];

  const computeDefaultTranslate = useCallback((width, height) => ({
    x: width / 2,
    y: Math.max(120, height * 0.15),
  }), []);

  const updateDimensions = useCallback(() => {
    if (!wrapperRef.current) {
      return;
    }
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    if (width && height) {
      setDimensions({ width, height });
      setTranslate((current) =>
        current.x === 0 && current.y === 0
          ? computeDefaultTranslate(width, height)
          : current
      );
    }
  }, [computeDefaultTranslate]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    nodePositionsRef.current = {};
  }, [filteredTreeData]);

  useEffect(() => {
    if (!pendingFocusId) {
      return undefined;
    }
    let frame;
    const attemptFocus = () => {
      const nodeRef = nodePositionsRef.current[pendingFocusId];
      if (nodeRef && treeRef.current) {
        treeRef.current.centerNode(nodeRef);
        setPendingFocusId(null);
        return;
      }
      frame = requestAnimationFrame(attemptFocus);
    };
    attemptFocus();
    return () => cancelAnimationFrame(frame);
  }, [pendingFocusId]);

  useEffect(() => {
    const entry = nodeMap[selectedNodeId];
    if (!entry) {
      return;
    }
    const familyId = entry.path[1]?.id;
    if (familyId && !activeFilters[familyId]) {
      setSelectedNodeId(rootNode.id);
    }
  }, [activeFilters, nodeMap, selectedNodeId, rootNode.id]);

  const registerNodePosition = useCallback((nodeId, hierarchyPointNode) => {
    nodePositionsRef.current[nodeId] = hierarchyPointNode;
  }, []);

  const focusNodeById = useCallback((nodeId) => {
    const nodeRef = nodePositionsRef.current[nodeId];
    if (nodeRef && treeRef.current) {
      treeRef.current.centerNode(nodeRef);
      return true;
    }
    return false;
  }, []);

  const triggerHighlight = useCallback((nodeId) => {
    setHighlightedNodeId(nodeId);
    if (highlightTimeout.current) {
      clearTimeout(highlightTimeout.current);
    }
    highlightTimeout.current = setTimeout(() => setHighlightedNodeId(null), 2000);
  }, []);

  useEffect(() => () => highlightTimeout.current && clearTimeout(highlightTimeout.current), []);

  const handleNodeClick = useCallback(
    (hierarchyPointNode) => {
      const nodeId = hierarchyPointNode.data.id;
      setSelectedNodeId(nodeId);
      triggerHighlight(nodeId);
    },
    [triggerHighlight]
  );

  const handleTreeUpdate = useCallback((state) => {
    if (state?.translate) {
      setTranslate(state.translate);
    }
    if (typeof state?.zoom === "number") {
      setZoom(state.zoom);
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((current) => Math.min(SCALE_EXTENT.max, current + 0.15));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((current) => Math.max(SCALE_EXTENT.min, current - 0.15));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(0.85);
    setTranslate((current) => computeDefaultTranslate(dimensions.width || 0, dimensions.height || 0) || current);
  }, [dimensions, computeDefaultTranslate]);

  const handleFilterToggle = useCallback((id) => {
    setActiveFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleSearchSelect = useCallback(
    (nodeId) => {
      setSearchQuery("");
      const entry = nodeMap[nodeId];
      if (!entry) {
        return;
      }
      const familyId = entry.path[1]?.id;
      if (familyId && !activeFilters[familyId]) {
        setActiveFilters((prev) => ({ ...prev, [familyId]: true }));
      }
      setSelectedNodeId(nodeId);
      triggerHighlight(nodeId);
      if (!focusNodeById(nodeId)) {
        setPendingFocusId(nodeId);
      }
    },
    [nodeMap, activeFilters, focusNodeById, triggerHighlight]
  );

  const handleChildSelect = useCallback(
    (nodeId) => {
      setSelectedNodeId(nodeId);
      triggerHighlight(nodeId);
      if (!focusNodeById(nodeId)) {
        setPendingFocusId(nodeId);
      }
    },
    [focusNodeById, triggerHighlight]
  );

  return (
    <div className="family-tree-layout">
      <Sidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectResult={handleSearchSelect}
        filters={filters}
        onToggleFilter={handleFilterToggle}
        legendItems={legendItems}
      />

      <section className="tree-panel">
        <div id="treeWrapper" className="tree-wrapper" ref={wrapperRef}>
          {dimensions.width > 0 && dimensions.height > 0 && (
            <ClanTree
              data={filteredTreeData}
              translate={translate}
              zoom={zoom}
              dimensions={dimensions}
              onNodeClick={handleNodeClick}
              onUpdate={handleTreeUpdate}
              registerNodePosition={registerNodePosition}
              selectedNodeId={selectedNodeId}
              highlightedNodeId={highlightedNodeId}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleReset}
              treeRef={treeRef}
            />
          )}
        </div>
      </section>

      <DetailsPanel
        node={selectedNode}
        breadcrumbs={breadcrumbs}
        onChildSelect={handleChildSelect}
      />
    </div>
  );
};

export default FamilyTree;
