import React from "react";
import ListEmpty from "./ListEmpty";
import ListCheck from "./ListCheck";
import DateTime from "./DateTime";

const TaskList = ({ render, data, filter }) => {
  if (!data || data.length === 0) {
    return <ListEmpty filter={filter} />;
  } else {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <ListCheck render={render} key={item._id ?? index} item={item} />
        ))}
      </div>
    );
  }
};

export default TaskList;
