import { Carousel, Col, Divider, Row, Typography } from "antd";
import { defaultColors } from "../../common/color";

const HomePage = () => {
  return (
    <div style={{ padding: 20, paddingTop: 0 }}>
      <Typography.Title level={3}>Home</Typography.Title>
      <Divider />
      <Typography.Title level={5}>Our service</Typography.Title>
      <Carousel autoplay>
        {[
          "Primary care",
          "Specialized clinics",
          "Sexual health",
          "Mental health",
          "Addiction services",
          "Community health",
          "Retail clinics",
          "Rural health",
          "Dialysis",
          "Mobile clinics",
          "Low-cost care",
          "Bottom line",
        ].map((s) => (
          <div key={s}>
            <h3
              style={{
                margin: 0,
                height: "160px",
                color: "#fff",
                lineHeight: "160px",
                textAlign: "center",
                background: defaultColors.primary,
              }}
            >
              {s}
            </h3>
          </div>
        ))}
      </Carousel>
      <Divider />
      <Typography.Title level={5}>About us</Typography.Title>
      <Carousel autoplay>
        <div>
          <img
            style={{ objectFit: "cover", height: 500, width: "100%" }}
            src="/clinic-1.jpg"
          />
        </div>
        <div>
          <img
            style={{ objectFit: "cover", height: 500, width: "100%" }}
            src="/clinic-2.jpg"
          />
        </div>
        <div>
          <img
            style={{ objectFit: "cover", height: 500, width: "100%" }}
            src="/clinic-3.jpg"
          />
        </div>
        <div>
          <img
            style={{ objectFit: "cover", height: 500, width: "100%" }}
            src="/clinic-4.jpg"
          />
        </div>
      </Carousel>
      <div
        style={{
          margin: "50px -20px -20px",
          padding: "40px 20px 0px",
          backgroundColor: "#1677ff",
          color: "white",
        }}
      >
        <Row>
          <Col span={8}>
            <Typography.Title style={{ color: "white", margin: 0 }}>
              CLINIC
            </Typography.Title>
            <Typography.Paragraph style={{ color: "#fefefe" }}>
              Talk to online doctors and get medical advice, online
              prescription, refills and medical notes within minutes. On-demands
              healthcare services at your fingertips.
            </Typography.Paragraph>
          </Col>
          <Col span={5} offset={1}>
            <Typography.Title
              level={3}
              style={{ color: "white", marginTop: 0 }}
            >
              Services
            </Typography.Title>
            {[
              "Emegency care",
              "Heart Disease",
              "Dental Care",
              "Prescription",
              "Insight of doctors",
            ].map((title) => (
              <Typography.Paragraph
                key={title}
                style={{ color: "#fefefe", margin: 0 }}
              >
                {title}
              </Typography.Paragraph>
            ))}
          </Col>
          <Col span={5}>
            <Typography.Title
              level={3}
              style={{ color: "white", marginTop: 0 }}
            >
              Legal
            </Typography.Title>
            {[
              "General Info",
              "Privacy Policy",
              "Term of services",
              "Consulations",
              "How it works",
            ].map((title) => (
              <Typography.Paragraph
                key={title}
                style={{ color: "#fefefe", margin: 0 }}
              >
                {title}
              </Typography.Paragraph>
            ))}
          </Col>
          <Col span={5}>
            <Typography.Title
              level={3}
              style={{ color: "white", marginTop: 0 }}
            >
              Talk to us
            </Typography.Title>
            <Typography.Paragraph style={{ color: "#fefefe" }}>
              support@clinic.com
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: "#fefefe" }}>
              Address: 1/123 Dong Da, Ba Dinh, Ha Noi, Viet Nam
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: "#fefefe" }}>
              (+84) 0988763539
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: "#fefefe" }}>
              (+84) 0232838301
            </Typography.Paragraph>
          </Col>
        </Row>
        <div></div>
        <Divider style={{ backgroundColor: "#fefefe", margin: 0 }} />
        <p style={{ padding: "20px 10px" }}>
          2023 Clinic. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
