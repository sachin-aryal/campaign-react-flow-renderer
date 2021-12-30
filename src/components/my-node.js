import React from "react";
import "./my-node.css";

const MyNode = ({ nodeData }) => {
    const selectNode = () => {
        console.log("I'm " + nodeData.name + ".");
    };

    const getNodeTypeClass = () => {
        let ruleName = nodeData.name
        if(ruleName === "Exit"){
            return "exit-node"
        }else if (ruleName === "Reject"){
            return 'reject-node'
        }else if(ruleName.endsWith("?")){
            return "conditional-node"
        }else{
            return "action-node"
        }
    }

    return (
        <div onClick={selectNode}>
            <div className={"rule-node rule-"+nodeData.status+" "+getNodeTypeClass()}>{nodeData.name}</div>
        </div>
    );
};

export default MyNode;
