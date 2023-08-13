import { FaSearch, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Submitted",
      count: defaultStats?.submitted || 0,
      icon: <FaSearch />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "Accepted",
      count: defaultStats?.Accepted || 0,
      icon: <FaSearchPlus />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Wrong Answer",
      count: defaultStats?.Wrong_Answer || 0,
      icon: <FaSearchMinus />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
