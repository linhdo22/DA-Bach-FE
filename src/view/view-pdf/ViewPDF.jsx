import {
  Document,
  Image,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import { useLayoutEffect, useState } from "react";

const ViewPDF = () => {
  const [info, setInfo] = useState({});
  const drugs = info?.diagnosis?.drugs || [];
  const doctor = info?.doctor || {};
  const customer = info?.customer || {};
  const diagnosis = info?.diagnosis || {};

  useLayoutEffect(() => {
    try {
      const listStr = localStorage.getItem("info");
      localStorage.removeItem("info");
      if (!listStr) {
        return;
      }
      setInfo(JSON.parse(listStr));
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(info);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <PDFViewer style={{ height: "100%", width: "100%", border: "unset" }}>
        <Document>
          <Page size={"A6"} wrap={false}>
            <View
              style={{
                backgroundColor: "#F7F7F7",
                display: "flex",
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <View
                style={{ borderBottom: "2px solid black", marginBottom: 10 }}
              >
                <Text>Medical record</Text>
              </View>
              <View style={{ flexDirection: "row", width: 220, height: 100 }}>
                <Image src="/doctor.png"></Image>
                <View style={{ marginLeft: 10 }}>
                  <View
                    style={{
                      marginBottom: 5,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>Name: {customer.name}</Text>
                  </View>
                  <View
                    style={{
                      marginBottom: 5,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      Date of birth:{" "}
                      {moment(customer.dateOfBirth).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginBottom: 5,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      Phone: {customer.phone}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginBottom: 5,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>
                      Email: {customer.email}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ borderTop: "2px solid black", paddingTop: 5 }}>
                <Text style={{ fontSize: 10 }}>Doctor: {doctor.name}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 10 }}>Phone: {doctor.phone}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 10 }}>Email: {doctor.email}</Text>
              </View>

              <View
                style={{ border: "1px solid black", padding: 5, marginTop: 5 }}
              >
                <View>
                  <Text style={{ fontSize: 14, marginBottom: 3 }}>
                    Diagnose
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5 }}>
                    {diagnosis.content}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5 }}>Attachment</Text>
                </View>
                {diagnosis?.image && (
                  <View>
                    <Image
                      cache={false}
                      style={{ width: 70, objectFit: "cover", height: 50 }}
                      src={{
                        uri: `${import.meta.env.VITE_REACT_APP_API_BASE_URL.replace(
                          "/api",
                          ""
                        )}/${diagnosis?.image}`,
                        method: "GET",
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                        },
                      }}
                    />
                  </View>
                )}
              </View>

              <View
                style={{
                  border: "1px solid black",
                  padding: 5,
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 3 }}>
                  Treatmeant
                </Text>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5 }}>
                    Treatment time:{" "}
                    {moment(info.start).format("HH:mm MM-DD-YYYY")}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5 }}>
                    Specified time:{" "}
                    {moment(diagnosis.createdAt).format("HH:mm MM-DD-YYYY")}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 10, marginTop: 5 }}>
                    Medicines:{" "}
                  </Text>
                </View>
                <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                  {drugs.map((d, index) => (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>
                        {d.name}: {d.count}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={{ borderTop: "2px solid black", marginTop: 10 }}>
                <Text>Thank for use our service</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ViewPDF;
