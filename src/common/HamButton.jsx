import { Button, ConfigProvider } from "antd";

function HamButton({ toggle, icon }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFF",
          boxShadow: 0,
        },
      }}
    >
      <Button
        className="text-black fixed w-32 h-32 border-0 xl:hidden shadow-none flex items-center 
          justify-center bg-white md:hidden rounded-full z-50"
        type="primary"
        size="large"
        icon={icon}
        onClick={toggle}
      />
    </ConfigProvider>
  );
}

export default HamButton;
