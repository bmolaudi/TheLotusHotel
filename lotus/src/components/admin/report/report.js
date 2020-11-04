import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./PageTitle";
import SmallStats from "./SmallStats";
import UsersOverview from "./UsersOverview";
import UsersByDevice from "./UsersByDevice";
import {getRoomsNumber, getOccupiedRooms, getUserNumber} from "../../../config/firebaseConfig"

const Reports = ({ smallStats }) => {
    const [roomNumber, setRoomNumber] = useState("");
    const [users, setUsers] = useState("");
    const [bookedRooms, setbookedRooms] = useState("");
    
    
    useEffect(() => {
        async function fetchProduct() {
            setRoomNumber(await getRoomsNumber());
            setbookedRooms(await getOccupiedRooms());
            setUsers(await getUserNumber());
    
        }
    
        fetchProduct();
    }, []);
    console.log(roomNumber)
    
return(
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Report" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
        {smallStats[0].value = roomNumber}
        {smallStats[1].value = parseInt(roomNumber)+ parseInt(bookedRooms)}
        {smallStats[2].value = bookedRooms}
        {smallStats[3].value = users}
      {smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <UsersOverview />
      </Col>

      {/* Users by Device */}
      <Col lg="4" md="6" sm="12" className="mb-4">
        <UsersByDevice />
      </Col>
    </Row>
  </Container>
)};

Reports.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Reports.defaultProps = {
  smallStats: [
    {
      label: "Total Number of Rooms",
      value: "2,390",
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    },
    {
      label: "Free Rooms (today)",
      value: "182",
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    },
    {
      label: "Occupatied Rooms (today)",
      value: "8,147",
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    },
    {
      label: "Users",
      value: "29",
      percentage: "2.71%",
      increase: true,
      decrease: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 5, 7, 8, 9]
        }
      ]
    },
  ]
};

export default Reports;
