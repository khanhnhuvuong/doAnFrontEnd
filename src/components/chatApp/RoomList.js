import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";
import TextArea from "./textArea";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
        React.useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header='Danh sách các phòng' key='1'>
                {rooms.map((room) => (
                    <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
                        {room.name}
                    </LinkStyled>
                ))}
                <Button
                    type='text'
                    icon={<PlusSquareOutlined />}
                    className='add-room'
                    onClick={handleAddRoom}
                >
                    Thêm phòng
                </Button>
            </PanelStyled>
        </Collapse>
    );
}
