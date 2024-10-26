import React, { useEffect, useState } from "react";
import { generateMnemonic, encryptMnemonic, decryptMnemonic } from "../utils/mnemonicUtils";
import { Box, Button, VStack, Text, Flex } from "@chakra-ui/react";
import { useMnemonic } from "../context/MnemonicContext";

function MnemonicManager() {
  const { setMnemonics } = useMnemonic();
  const [decryptedMnemonics, setDecryptedMnemonics] = useState<{ oracle: string; alice: string; bob: string } | null>(
    null
  );
  const [showSeedPhrases, setShowSeedPhrases] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // New state to track first load

  const uniqueIdentifier = navigator.userAgent; // Use browser's user agent as a unique identifier

  useEffect(() => {
    const storedMnemonics = localStorage.getItem("mnemonics");
    if (storedMnemonics) {
      setIsFirstLoad(false); // Set to false if mnemonics are found
      const encryptedMnemonics = JSON.parse(storedMnemonics);
      setMnemonics(encryptedMnemonics);
      const decryptedMnemonics = {
        oracle: decryptMnemonic(encryptedMnemonics.oracle, uniqueIdentifier),
        alice: decryptMnemonic(encryptedMnemonics.alice, uniqueIdentifier),
        bob: decryptMnemonic(encryptedMnemonics.bob, uniqueIdentifier),
      };
      setDecryptedMnemonics(decryptedMnemonics);
    }
  }, []);

  const handleGenerateMnemonics = () => {
    const oracleMnemonic = generateMnemonic();
    const aliceMnemonic = generateMnemonic();
    const bobMnemonic = generateMnemonic();

    const encryptedMnemonics = {
      oracle: encryptMnemonic(oracleMnemonic, uniqueIdentifier),
      alice: encryptMnemonic(aliceMnemonic, uniqueIdentifier),
      bob: encryptMnemonic(bobMnemonic, uniqueIdentifier),
    };

    localStorage.setItem("mnemonics", JSON.stringify(encryptedMnemonics));
    setMnemonics(encryptedMnemonics);
    setDecryptedMnemonics({ oracle: oracleMnemonic, alice: aliceMnemonic, bob: bobMnemonic });
    setShowSeedPhrases(false);
  };

  const handleRevealSeedPhrases = () => {
    setShowSeedPhrases(!showSeedPhrases);
  };

  return (
    <Box as="header" bg="gray.900" p={4} boxShadow="md">
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          tabconf-dlc-wallet-starter
        </Text>
        <Box>
          <Button colorScheme="teal" onClick={handleGenerateMnemonics} mr={2}>
            {isFirstLoad ? "Generate Mnemonics" : "Regenerate Mnemonics"} {/* Conditional button text */}
          </Button>
          <Button colorScheme="blue" onClick={handleRevealSeedPhrases}>
            {showSeedPhrases ? "Hide Seed Phrases" : "Reveal Seed Phrases"}
          </Button>
        </Box>
      </Flex>
      {showSeedPhrases && decryptedMnemonics && (
        <VStack align="stretch" mt={4}>
          <Box mt={4}>
            <Text>Oracle Mnemonic: {decryptedMnemonics.oracle}</Text>
            <Text>Alice Mnemonic: {decryptedMnemonics.alice}</Text>
            <Text>Bob Mnemonic: {decryptedMnemonics.bob}</Text>
          </Box>
        </VStack>
      )}
    </Box>
  );
}

export default MnemonicManager;
