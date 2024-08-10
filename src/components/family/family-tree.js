import React, { useState, useCallback, useRef, useEffect } from "react";
import { Tree } from "react-d3-tree";
import "./family-tree.css";

const data = {
  name: "Sarman",
  attributes: {
    role: "Head of the Family",
  },
  children: [
    {
      name: "Jamac",
      attributes: {
        role: "Son",
      },
    },
    {
      name: "Maxamed",
      attributes: {
        role: "Son",
      },
    },
    {
      name: "Ismail",
      attributes: {
        role: "Son",
      },
      children: [
        {
          name: "Yusuf",
          attributes: {
            role: "Son",
          },
        },
        {
          name: "Suleiban",
          attributes: {
            role: "Son",
          },
        },
        {
          name: "Cabdi",
          attributes: {
            role: "Son",
          },
        },
        {
          name: "Cumar",
          attributes: {
            role: "Son",
          },
        },
        {
          name: "Ibrahim",
          attributes: {
            role: "Son",
          },
          children: [
            {
              name: "Canab Abshir",
              attributes: {
                role: "Wife",
              },
              children: [
                {
                  name: "Abdirizak Ibrahim",
                  attributes: {
                    role: "Son",
                  },
                },
                {
                  name: "Huda Ibrahim",
                  attributes: {
                    role: "Daughter",
                  },
                },
                {
                  name: "Hana Ibrahim",
                  attributes: {
                    role: "Daughter",
                  },
                  children: [
                    {
                        name: "Jamal",
                        attributes: {
                          role: "Son",
                        },
                    },
                    {
                        name: "Layla",
                        attributes: {
                          role: "Daughter",
                        },
                    }
                  ],
                },
                {
                  name: "Yasmin Ibrahim",
                  attributes: {
                    role: "Son",
                  },
                  
                },
                {
                  name: "Maxamed Ibrahim",
                  attributes: {
                    role: "Son",
                  },
                },
              ],
            },
            {
                name: "Wife 2",
                attributes: {
                role: "Wife",
                },
                children: [
                    {
                        name: "C1",
                        attributes: {
                        role: "",
                        },
                    },
                ],
            },
            {
                name: "Wife 3",
                attributes: {
                role: "Wife",
                },
                children: [
                    {
                        name: "C1",
                        attributes: {
                        role: "",
                        },
                    },
                ],
            }
          ],
        },
        {
          name: "Maryam",
          attributes: {
            role: "Sister",
          },
        },
      ],
    },
  ],
};

const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
  <g>
    <circle r={25} onClick={toggleNode} />
    <text x="40" y="0" className="node-name">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.role && (
      <text x="40" y="15" className="node-attribute">
        {nodeDatum.attributes?.role}
      </text>
    )}
  </g>
);

const FamilyTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const wrapperRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (wrapperRef.current) {
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 4 });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const onNodeClick = useCallback(
    (nodeData, evt) => {
      const { x, y } = nodeData;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 4; // Changed to position nodes higher

      setTranslate({
        x: centerX - x,
        y: centerY - y,
      });
    },
    [dimensions]
  );

  return (
    <div id="treeWrapper" ref={wrapperRef}>
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="diagonal"
        translate={translate}
        dimensions={dimensions}
        onNodeClick={onNodeClick}
        renderCustomNodeElement={renderCustomNodeElement}
        separation={{ siblings: 1, nonSiblings: 1 }}
        nodeSize={{ x: 200, y: 100 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        leafNodeClassNames={{ text: "node__text" }}
        transitionDuration={800}
        zoomable={false} // Added to disable default zoom behavior
      />
    </div>
  );
};
export default FamilyTree;
