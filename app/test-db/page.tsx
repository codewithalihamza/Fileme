"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function TestDbPage() {
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testContactSubmission = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phone: "03000000000",
          service: "tax",
          message: "This is a test submission",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResult(
          `✅ Contact submission successful: ${JSON.stringify(data, null, 2)}`
        );
      } else {
        setTestResult(`❌ Contact submission failed: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testReferralSubmission = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/refer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendName: "Test Friend",
          friendEmail: "friend@example.com",
          friendPhone: "03000000001",
          referrerName: "Test Referrer",
          referrerEmail: "referrer@example.com",
          referrerPhone: "03000000002",
          service: "tax",
          accountDetails: "Test account details",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResult(
          `✅ Referral submission successful: ${JSON.stringify(data, null, 2)}`
        );
      } else {
        setTestResult(`❌ Referral submission failed: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testDuplicateContact = async () => {
    setLoading(true);
    try {
      // First submission
      const response1 = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Duplicate Test User",
          email: "duplicate@example.com",
          phone: "03000000003",
          service: "tax",
          message: "First submission",
        }),
      });

      const data1 = await response1.json();

      if (response1.ok) {
        // Second submission with same phone
        const response2 = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Duplicate Test User 2",
            email: "duplicate2@example.com",
            phone: "03000000003", // Same phone
            service: "accounting",
            message: "Second submission - should be blocked",
          }),
        });

        const data2 = await response2.json();

        if (!response2.ok) {
          setTestResult(`✅ Duplicate prevention working: ${data2.error}`);
        } else {
          setTestResult(
            `❌ Duplicate prevention failed: Second submission was allowed`
          );
        }
      } else {
        setTestResult(`❌ First submission failed: ${data1.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Database Connection Test</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Test Contact Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testContactSubmission}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Test Contact API"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Referral Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testReferralSubmission}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Test Referral API"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Duplicate Prevention</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={testDuplicateContact}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Test Duplicate Block"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {testResult && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
