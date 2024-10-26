import { Box, Container, Heading, VStack, Button, Input, Text, Textarea, createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useState } from "react";
import { EnumEventDescriptorV0, OracleAnnouncementV0 } from "@node-dlc/messaging";
import Oracle from "@/models/Oracle";

interface OraclePageProps {
  oracle: Oracle | null;
}

function OraclePage({ oracle }: OraclePageProps) {
  const [eventId, setEventId] = useState("");
  const [eventMaturityEpoch, setEventMaturityEpoch] = useState("");
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [announcement, setAnnouncement] = useState<OracleAnnouncementV0 | null>(null);
  const [announcementHex, setAnnouncementHex] = useState("");
  const [announcementJson, setAnnouncementJson] = useState("");
  const [attestationHex, setAttestationHex] = useState("");
  const [attestationJson, setAttestationJson] = useState("");

  const frameworks = createListCollection({
    items: outcomes.map((outcome) => ({ label: outcome, value: outcome })),
  });

  const handleCreateAnnouncement = async () => {
    if (oracle) {
      const eventDescriptor = new EnumEventDescriptorV0();
      eventDescriptor.outcomes = outcomes;

      try {
        const announcement = await oracle.createEnumOracleAnnouncement(
          eventId,
          parseInt(eventMaturityEpoch, 10),
          eventDescriptor
        );
        setAnnouncementHex(announcement.serialize().toString("hex"));
        setAnnouncementJson(JSON.stringify(announcement.toJSON(), null, 2));
        setAnnouncement(announcement);
        console.log("Oracle Announcement Created:", announcement);
      } catch (error) {
        console.error("Error creating oracle announcement:", error);
      }
    }
  };

  const handleCreateAttestation = async () => {
    if (oracle && announcement && selectedOutcome) {
      const attestation = await oracle.createEnumAttestation(announcement?.oracleEvent, selectedOutcome);

      setAttestationHex(attestation.serialize().toString("hex"));
      setAttestationJson(JSON.stringify(attestation.toJSON(), null, 2));
    }
  };

  return (
    <Box>
      <Container maxW="container.xl" py={8}>
        <VStack>
          <Heading size="xl">Oracle</Heading>
          <Text>Event ID</Text>
          <Input value={eventId} onChange={(e) => setEventId(e.target.value)} />
          <Text>Event Maturity Epoch</Text>
          <Input value={eventMaturityEpoch} onChange={(e) => setEventMaturityEpoch(e.target.value)} />
          <Text>Outcomes (comma-separated)</Text>
          <Input
            value={outcomes.join(", ")}
            onChange={(e) => setOutcomes(e.target.value.split(",").map((outcome) => outcome.trim()))}
          />
          <Button onClick={handleCreateAnnouncement} disabled={!oracle}>
            Create Oracle Announcement
          </Button>
          {announcementHex && (
            <>
              <Text>Announcement (Hex):</Text>
              <Textarea value={announcementHex} readOnly={true} />
            </>
          )}
          {announcementJson && (
            <>
              <Text>Announcement (JSON):</Text>
              <Textarea value={announcementJson} readOnly={true} />
            </>
          )}
          <Text>Select Outcome for Attestation</Text>
          <SelectRoot collection={frameworks} size="sm" width="320px">
            <SelectLabel>Select Outcome</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((outcome) => (
                <SelectItem item={outcome} key={outcome.value} onClick={() => setSelectedOutcome(outcome.value)}>
                  {outcome.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <Button onClick={handleCreateAttestation} disabled={!oracle || !announcement || !selectedOutcome}>
            Create Oracle Attestation
          </Button>
          {attestationHex && (
            <>
              <Text>Attestation (Hex):</Text>
              <Textarea value={attestationHex} readOnly={true} />
            </>
          )}
          {attestationJson && (
            <>
              <Text>Attestation (JSON):</Text>
              <Textarea value={attestationJson} readOnly={true} />
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default OraclePage;
