import React from 'react';
const getCopyFullYear = () => {
    const preYear = new Date().getFullYear();
    const Year = new Date().getFullYear() + 1;
    return `${preYear}-${Year}`;
}
const Copyright = () => {
    return (
        <div>
            REACT管理系统 ©{getCopyFullYear()} 版权所有
        </div>
    );
};

export default Copyright;
