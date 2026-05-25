import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

// TypeScript Interface
interface HistoryRecord {
  id: number;
  preview: string;
  type: string;
  verdict: string;
  time: string;
}

export default function Index() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [type, setType] = useState<string>("message");
  const [heuristicFlags, setHeuristicFlags] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  // Robust API URL resolution
  const getApiUrl = () => {
    const defaultUrl = "http://192.168.100.50:5000/predict";
    const androidUrl = process.env.EXPO_PUBLIC_ANDROIDAPI || defaultUrl;
    const iosUrl = process.env.EXPO_PUBLIC_IOSAPI || defaultUrl;
    const webUrl = (process.env as any).VITE_API_URI || "http://localhost:5000/predict";

    const finalUrl = Platform.OS === 'web' ? webUrl : (Platform.OS === 'android' ? androidUrl : iosUrl);
    
    console.log("Current API_URL being used:", finalUrl);
    return finalUrl;
  };

  const API_URL = getApiUrl();

  useEffect(() => {
    const flags: string[] = [];
    if (!text.trim()) {
      setHeuristicFlags([]);
      return;
    }
    if (/https?:\/\/[^\s]+/i.test(text)) flags.push("🔗 URL Link Contained");
    if (
      /(win|prize|lottery|cash|reward|free|money|crypto|dollars|£|\$)/i.test(
        text
      )
    )
      flags.push("💰 Financial Bait");
    if (
      /(urgent|immediate|verify|blocked|expire|suspend|action required|now)/i.test(
        text
      )
    )
      flags.push("🚨 Urgency Trigger");
    if (/(dear customer|sir|madam|valued user)/i.test(text))
      flags.push("👥 Generic Greeting");
    setHeuristicFlags(flags);
  }, [text]);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  const loadTestingData = (sampleType: string) => {
    if (sampleType === "spam") {
      setText(
        "ALERT! Your personal number has won a guaranteed cash payout voucher of $2,000. Submit your secure confirmation credentials immediately at http://claim-vouchers.net."
      );
      setType("message");
    } else if (sampleType === "fraud") {
      setText(
        "Dear Customer, we identified unverified login credentials accessing your credit profile. Please log in to your dashboard portal at http://secure-profile-check.org to prevent account suspension."
      );
      setType("email");
    } else {
      setText(
        "Hey! I just wrapped up editing the vector tokenizing pipeline scripts. Let me know when you want to review the updated repository on GitHub."
      );
      setType("message");
    }
    setResult("");
  };

  const runPacedInspectionSteps = () => {
    return new Promise<void>((resolve) => {
      const steps = [
        "Analyzing packets...",
        "Validating tokens...",
        "Computing AI matrix...",
      ];
      let pointer = 0;
      setLoadingStep(steps[0]);
      const interval = setInterval(() => {
        pointer++;
        if (pointer < steps.length) {
          setLoadingStep(steps[pointer]);
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 400);
    });
  };

  const handlePredict = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      setResult("");
      await runPacedInspectionSteps();

      const res = await axios.post(API_URL, { text, type });
      const predictionResult = res.data.prediction;
      setResult(predictionResult);

      const historyItem: HistoryRecord = {
        id: Date.now(),
        preview: text.substring(0, 48) + (text.length > 48 ? "..." : ""),
        type,
        verdict: predictionResult,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setHistory((prev) => [historyItem, ...prev].slice(0, 4));
    } catch (error: any) {
      console.log("Axios Error:", error.response?.data || error.message);
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  const getResultStyle = () => {
    if (result === "ham")
      return {
        bg: "#ede9fe",
        border: "#8b5cf6",
        text: "#5b21b6",
        label: "🛡️ Clean Message",
      };
    if (result === "spam")
      return {
        bg: "#fdf2f8",
        border: "#ec4899",
        text: "#be185d",
        label: "❌ Spam Detected",
      };
    if (result === "smishing")
      return {
        bg: "#fce7f3",
        border: "#db2777",
        text: "#9d174d",
        label: "⚠️ Phishing Risk",
      };
    return {
      bg: "#f8fafc",
      border: "#cbd5e1",
      text: "#475569",
      label: "Awaiting Analysis...",
    };
  };

  const resultStyle = getResultStyle();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🛡️</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>SpamShield AI</Text>
          <Text style={styles.subtitle}>ENTERPRISE CLASSIFICATION NODE</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>Synced</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>📋 Input Stream Controller</Text>
          <TouchableOpacity
            onPress={() => {
              setText("");
              setResult("");
            }}
            style={styles.resetBtn}
          >
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              type === "message" && styles.activeSelector,
            ]}
            onPress={() => setType("message")}
          >
            <Text
              style={[
                styles.selectorText,
                type === "message" && styles.activeSelectorText,
              ]}
            >
              💬 SMS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectorButton,
              type === "email" && styles.activeSelector,
            ]}
            onPress={() => setType("email")}
          >
            <Text
              style={[
                styles.selectorText,
                type === "email" && styles.activeSelectorText,
              ]}
            >
              📧 EMAIL
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder={
            type === "message" ? "Enter SMS text..." : "Enter email content..."
          }
          placeholderTextColor="#94a3b8"
          value={text}
          onChangeText={setText}
        />

        <View style={styles.countRow}>
          <Text style={styles.countText}>{charCount} CHARS</Text>
          <Text style={styles.countText}>{wordCount} WORDS</Text>
        </View>

        <View style={styles.flagsContainer}>
          <Text style={styles.flagsTitle}>Live Flags:</Text>
          {heuristicFlags.length === 0 ? (
            <Text style={styles.noFlags}>Scanning patterns...</Text>
          ) : (
            heuristicFlags.map((flag, index) => (
              <View key={index} style={styles.flag}>
                <Text style={styles.flagText}>{flag}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.templateRow}>
          <TouchableOpacity
            style={styles.templateBtn}
            onPress={() => loadTestingData("spam")}
          >
            <Text style={styles.templateText}>+ Spam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.templateBtn}
            onPress={() => loadTestingData("fraud")}
          >
            <Text style={styles.templateText}>+ Phish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.templateBtn}
            onPress={() => loadTestingData("safe")}
          >
            <Text style={styles.templateText}>+ Safe</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.predictBtn}
          disabled={loading}
          onPress={handlePredict}
        >
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#fff" />
              <Text style={styles.predictText}>{loadingStep}</Text>
            </View>
          ) : (
            <Text style={styles.predictText}>Compute Threat Index</Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.resultCard,
          { backgroundColor: resultStyle.bg, borderColor: resultStyle.border },
        ]}
      >
        <Text style={styles.resultHeading}>📊 Classification Diagnostics</Text>
        <Text style={[styles.resultLabel, { color: resultStyle.text }]}>
          {resultStyle.label}
        </Text>
        {result ? (
          <Text style={[styles.resultText, { color: resultStyle.text }]}>
            {result.toUpperCase()}
          </Text>
        ) : null}
        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width:
                  result === "spam"
                    ? "100%"
                    : result === "smishing"
                    ? "80%"
                    : result === "ham"
                    ? "20%"
                    : "0%",
                backgroundColor: resultStyle.border,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.logsCard}>
        <View style={styles.logsHeader}>
          <Text style={styles.logsTitle}>📜 Active Vector Cache Logs</Text>
          {history.length > 0 && (
            <TouchableOpacity onPress={() => setHistory([])}>
              <Text style={styles.flushText}>[FLUSH]</Text>
            </TouchableOpacity>
          )}
        </View>
        {history.length === 0 ? (
          <View style={styles.emptyLogs}>
            <Text style={styles.emptyLogsText}>
              No vectors stored in memory.
            </Text>
          </View>
        ) : (
          history.map((record) => (
            <View key={record.id} style={styles.logItem}>
              <View style={styles.logTop}>
                <Text style={styles.logType}>[{record.type}]</Text>
                <Text style={styles.logTime}>{record.time}</Text>
              </View>
              <Text style={styles.logPreview}>"{record.preview}"</Text>
              <View style={styles.logResultContainer}>
                <Text
                  style={[
                    styles.logResult,
                    {
                      backgroundColor:
                        record.verdict === "ham"
                          ? "#ede9fe"
                          : record.verdict === "spam"
                          ? "#fdf2f8"
                          : "#fce7f3",
                      color:
                        record.verdict === "ham"
                          ? "#5b21b6"
                          : record.verdict === "spam"
                          ? "#be185d"
                          : "#9d174d",
                    },
                  ]}
                >
                  {record.verdict.toUpperCase()}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ede9fe", padding: 16 },
  header: {
    marginTop: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 22 },
  title: { fontSize: 18, fontWeight: "800", color: "#111827" },
  subtitle: { fontSize: 10, fontWeight: "700", color: "#7c3aed", marginTop: 2 },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f3ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 99, backgroundColor: "#8b5cf6" },
  statusText: { fontWeight: "700", color: "#5b21b6", fontSize: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: { fontSize: 13, fontWeight: "800", color: "#4c1d95" },
  resetBtn: {
    backgroundColor: "#faf5ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  resetText: { color: "#7c3aed", fontWeight: "700", fontSize: 12 },
  selectorContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f3ff",
    padding: 5,
    borderRadius: 16,
    marginBottom: 18,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
  },
  activeSelector: { backgroundColor: "#fff" },
  selectorText: { fontWeight: "700", color: "#7c3aed" },
  activeSelectorText: { color: "#4c1d95" },
  input: {
    minHeight: 180,
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    padding: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ddd6fe",
    fontSize: 15,
    color: "#111827",
  },
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  countText: { fontSize: 11, fontWeight: "700", color: "#6d28d9" },
  flagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 18,
    alignItems: "center",
  },
  flagsTitle: { fontSize: 12, fontWeight: "800", color: "#4c1d95" },
  noFlags: { fontSize: 12, color: "#94a3b8" },
  flag: {
    backgroundColor: "#f5f3ff",
    borderWidth: 1,
    borderColor: "#ddd6fe",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  flagText: { fontSize: 11, fontWeight: "700", color: "#5b21b6" },
  templateRow: { flexDirection: "row", gap: 10, marginTop: 22 },
  templateBtn: {
    flex: 1,
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#ddd6fe",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  templateText: { fontWeight: "700", color: "#6d28d9", fontSize: 12 },
  predictBtn: {
    marginTop: 24,
    backgroundColor: "#7c3aed",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  predictText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  resultCard: { marginTop: 20, borderWidth: 1, borderRadius: 24, padding: 18 },
  resultHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4c1d95",
    marginBottom: 14,
  },
  resultLabel: { fontSize: 18, fontWeight: "800" },
  resultText: { marginTop: 8, fontSize: 26, fontWeight: "900" },
  progressBg: {
    width: "100%",
    height: 12,
    backgroundColor: "#ede9fe",
    borderRadius: 99,
    marginTop: 18,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 99 },
  logsCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  logsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  logsTitle: { fontSize: 13, fontWeight: "800", color: "#4c1d95" },
  flushText: { fontSize: 12, fontWeight: "800", color: "#7c3aed" },
  emptyLogs: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf5ff",
    borderRadius: 16,
  },
  emptyLogsText: { color: "#94a3b8", fontWeight: "700" },
  logItem: {
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#ddd6fe",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  logTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  logType: { color: "#6d28d9", fontWeight: "800", fontSize: 11 },
  logTime: { color: "#94a3b8", fontSize: 11, fontWeight: "700" },
  logPreview: { color: "#334155", fontWeight: "600", fontSize: 13 },
  logResultContainer: { alignItems: "flex-end", marginTop: 10 },
  logResult: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: "800",
    fontSize: 10,
  },
});