import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import {firestore} from '../../../config/firebaseConfig'
import Chart from "./chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  state = {
    rooms: [],
    data:[],
}

componentDidMount = async () => {
    const roomsFS = await firestore.collection("rooms").get();
        const rooms = [];

        roomsFS.forEach(room => {
                const newRoomId = room.data().addedRoom;
                const title = newRoomId.title;
                rooms.push(title);
        });
        console.log(rooms);
        this.setState({ rooms: rooms })
    const chartConfig = {
      type: "bar",
      data:  {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: [68.3, 24.2, 7.5],
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
              "rgba(0,123,255,0.3)"
            ]
          }
        ],
        labels: rooms
      },
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      },
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Room Popularity</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        {/* <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter> */}
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: "rooms",
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

export default UsersByDevice;
