import React, { useEffect, useState } from 'react';
import { IoMdUnlock } from 'react-icons/io';
import { IoBook, IoCreate, IoMenu, IoSettings, IoStatsChart, IoToday } from 'react-icons/io5';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/get-user');
        setIsAdmin(response.data.user.is_admin);
      } catch (error) {
        console.error('Došlo je do greške pri dobijanju informacija o korisniku:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: 'flex', height: '100vh', minHeight: "400px"}}>
      <Sidebar collapsed={collapsed}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem component={<Link to="/dashboard" />} icon={<IoStatsChart className="text-2xl" />}>Dashboard</MenuItem>
          <MenuItem component={<Link to="/notes" />} icon={<IoToday className="text-2xl" />}>Notes</MenuItem>
          <MenuItem component={<Link to="/subjects" />} icon={<IoBook className="text-2xl" />}>Subjects</MenuItem>
          <MenuItem component={<Link to="/createClass" />} icon={<IoCreate className="text-2xl" />}>Classes</MenuItem>
          {isAdmin ? ( // Provera da li je korisnik admin
            <SubMenu icon={<IoMdUnlock className="text-2xl" />} label="Admin">
              <MenuItem component={<Link to="#" />} >Add student</MenuItem>
              <MenuItem component={<Link to="#" />} >Add subject</MenuItem>
              <MenuItem component={<Link to="#" />} >Add rule</MenuItem>
              <MenuItem component={<Link to="#" />} >Edit accaunts</MenuItem>
            </SubMenu>
          ) : ( // Ako nije admin, dodajemo atribut disabled
            <SubMenu icon={<IoMdUnlock className="text-2xl" />} label="Admin" disabled>
              <MenuItem component={<Link to="#" />} >Add student</MenuItem>
              <MenuItem component={<Link to="#" />} >Add subject</MenuItem>
              <MenuItem component={<Link to="#" />} >Add rule</MenuItem>
              <MenuItem component={<Link to="#" />} >Edit accaunts</MenuItem>
            </SubMenu>
          )}
          <SubMenu icon={<IoSettings className="text-2xl" />} label="Account">
            <MenuItem component={<Link to="#" />}>Settings</MenuItem>
            <MenuItem onClick={onLogout}>Log out</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10, flex: '1 1 auto', position: 'relative' }}>
        <div style={{ position: 'sticky', bottom: 0, left: 0 }}>
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
            <IoMenu className="text-3xl" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default SidebarComponent;
