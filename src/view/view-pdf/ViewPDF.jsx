import { Document, PDFViewer, Page, Text, View } from "@react-pdf/renderer";
import { useLayoutEffect, useState } from "react";

const ViewPDF = () => {
  const [drugs, setDrugs] = useState([]);

  useLayoutEffect(() => {
    try {
      const listStr = localStorage.getItem("drugs");
      localStorage.removeItem("drugs");
      if (!listStr) {
        return;
      }
      setDrugs(JSON.parse(listStr));
    } catch (error) {
      console.error(error);
    }
  }, []);

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
                display: "flex",
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <View style={{ borderBottom: "2px solid black" }}>
                <Text>WEB CLINIC</Text>
              </View>
              <View style={{ minHeight: 250, padding: "10px 5px" }}>
                {drugs.map((d, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>Name: {d.name}</Text>
                    <Text style={{ fontSize: 12 }}>Quantity: {d.count}</Text>
                  </View>
                ))}
              </View>

              <View style={{ borderTop: "2px solid black" }}>
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
