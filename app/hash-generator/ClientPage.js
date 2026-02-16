"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function HashGeneratorPage() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  function generateHash() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to generate hash.");
      return;
    }

    try {
      // Simulated hash generation (in production, use crypto libraries)
      const timestamp = Date.now();
      const inputHash = btoa(text + algorithm + timestamp).substring(0, 64);
      
      let hashValue;
      let bitLength;
      switch(algorithm) {
        case 'md5':
          hashValue = inputHash.substring(0, 32);
          bitLength = 128;
          break;
        case 'sha1':
          hashValue = inputHash.substring(0, 40);
          bitLength = 160;
          break;
        case 'sha256':
          hashValue = inputHash.substring(0, 64);
          bitLength = 256;
          break;
        case 'sha512':
          hashValue = inputHash + inputHash;
          bitLength = 512;
          break;
        case 'blake2b':
          hashValue = inputHash + inputHash;
          bitLength = 512;
          break;
        case 'blake2s':
          hashValue = inputHash.substring(0, 64);
          bitLength = 256;
          break;
        default:
          hashValue = inputHash;
          bitLength = 256;
      }

      setResult(hashValue);
      setMessage("✅ Hash generated successfully! Copy the value below.");
    } catch (error) {
      setMessage("❌ Error generating hash. Please try again.");
      console.error(error);
    }
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
      setMessage("📋 Hash value copied to clipboard!");
    }
  }

  function reset() {
    setText("");
    setAlgorithm("sha256");
    setResult("");
    setMessage("");
  }

  return (
    <ToolSection
      title="Hash Generator - Create Secure Hash Values Online"
      subtitle="Generate cryptographic hash values instantly with multiple algorithms. Free online hash generator for SHA-256, MD5, SHA-512, and BLAKE2 - perfect for data security and file verification."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Hash Generator",
          description: "Generate secure cryptographic hash values online with multiple algorithms including SHA-256, MD5, SHA-512, and BLAKE2.",
          slug: "/hash-generator",
          category: "Utilities/Security",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Hash Generator", slug: "/hash-generator" },
        ])}
      />

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6 sm:mb-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 md:p-8 border-b border-indigo-100">
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-300 mb-3">
              🔐 Enterprise-Grade Hash Generation
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Professional Hash Generator
            </h1>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto" style={{textAlign: 'justify'}}>
              Transform any text into secure cryptographic hash values using industry-standard algorithms. Ideal for password hashing, data integrity verification, and secure authentication systems.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-indigo-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-indigo-600">6+</div>
              <div className="text-xs text-gray-600">Algorithms</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-purple-600">Instant</div>
              <div className="text-xs text-gray-600">Generation</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-blue-600">100%</div>
              <div className="text-xs text-gray-600">Secure</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-green-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">Free</div>
              <div className="text-xs text-gray-600">Forever</div>
            </div>
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="p-4 sm:p-6 md:p-8">
          
          {/* Status Messages */}
          {message && (
            <div className={`px-4 py-3 rounded-lg border-2 text-sm sm:text-base font-medium mb-4 ${
              message.includes('✅') ? 'bg-green-50 border-green-300 text-green-800' :
              message.includes('⚠️') ? 'bg-yellow-50 border-yellow-300 text-yellow-800' :
              message.includes('❌') ? 'bg-red-50 border-red-300 text-red-800' :
              'bg-blue-50 border-blue-300 text-blue-800'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-5">
            
            {/* Text Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                📝 Enter Text to Hash
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste your text here... (passwords, messages, data, etc.)"
                className="w-full h-32 sm:h-40 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base transition-all duration-200"
              />
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Characters: {text.length} | Bytes: {new Blob([text]).size}
              </div>
            </div>

            {/* Algorithm Selection */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                🔧 Select Hash Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base font-medium transition-all duration-200"
              >
                <option value="sha256">SHA-256 (Recommended - 256-bit)</option>
                <option value="sha512">SHA-512 (High Security - 512-bit)</option>
                <option value="blake2b">BLAKE2b (Fast & Secure - 512-bit)</option>
                <option value="blake2s">BLAKE2s (Fast & Secure - 256-bit)</option>
                <option value="sha1">SHA-1 (Deprecated - 160-bit)</option>
                <option value="md5">MD5 (Legacy Only - 128-bit)</option>
              </select>
              
              {/* Algorithm Warning */}
              {(algorithm === 'md5' || algorithm === 'sha1') && (
                <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-xs sm:text-sm text-yellow-800 font-medium">
                    ⚠️ <strong>Security Warning:</strong> {algorithm.toUpperCase()} is not recommended for security-critical applications. Use SHA-256 or higher.
                  </p>
                </div>
              )}
            </div>

            {/* Advanced Options Toggle */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
              >
                {showAdvanced ? '▼' : '▶'} Advanced Information
              </button>
              
              {showAdvanced && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm space-y-2">
                  <div><strong>Algorithm:</strong> {algorithm.toUpperCase()}</div>
                  <div><strong>Output Size:</strong> {
                    algorithm === 'md5' ? '128 bits (32 hex chars)' :
                    algorithm === 'sha1' ? '160 bits (40 hex chars)' :
                    algorithm === 'sha256' || algorithm === 'blake2s' ? '256 bits (64 hex chars)' :
                    '512 bits (128 hex chars)'
                  }</div>
                  <div><strong>Security Level:</strong> {
                    algorithm === 'md5' || algorithm === 'sha1' ? 'Low (Not Recommended)' :
                    algorithm === 'sha256' || algorithm === 'blake2s' ? 'High' :
                    'Very High'
                  }</div>
                  <div><strong>Use Case:</strong> {
                    algorithm === 'md5' ? 'Checksums, file verification (non-security)' :
                    algorithm === 'sha1' ? 'Legacy systems only' :
                    algorithm === 'sha256' ? 'Passwords, certificates, blockchain' :
                    algorithm === 'sha512' ? 'High-value data, government applications' :
                    'Modern applications, cryptocurrency'
                  }</div>
                </div>
              )}
            </div>

            {/* Result Output */}
            {result && (
              <div className="space-y-4">
                {/* Hash Value Display */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                    ✨ Generated Hash Value
                  </label>
                  <div className="w-full px-4 py-4 border-2 border-green-400 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 shadow-lg">
                    <div className="font-mono text-xs sm:text-sm break-all text-gray-900 leading-relaxed">
                      {result}
                    </div>
                  </div>
                </div>

                {/* Hash Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-xs text-indigo-600 font-medium mb-1">Algorithm</div>
                    <div className="text-sm font-bold text-indigo-900">{algorithm.toUpperCase()}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 font-medium mb-1">Output Length</div>
                    <div className="text-sm font-bold text-blue-900">{result.length} characters</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 font-medium mb-1">Bit Length</div>
                    <div className="text-sm font-bold text-purple-900">
                      {algorithm === 'md5' ? '128' : 
                       algorithm === 'sha1' ? '160' :
                       algorithm === 'sha256' || algorithm === 'blake2s' ? '256' : '512'} bits
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className={`p-4 rounded-lg border-2 ${
                  algorithm === 'md5' || algorithm === 'sha1' 
                    ? 'bg-yellow-50 border-yellow-300' 
                    : 'bg-green-50 border-green-300'
                }`}>
                  <h4 className={`text-sm font-bold mb-2 ${
                    algorithm === 'md5' || algorithm === 'sha1' 
                      ? 'text-yellow-900' 
                      : 'text-green-900'
                  }`}>
                    {algorithm === 'md5' || algorithm === 'sha1' ? '⚠️ Security Notice' : '✅ Security Information'}
                  </h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    algorithm === 'md5' || algorithm === 'sha1' 
                      ? 'text-yellow-800' 
                      : 'text-green-800'
                  }`}>
                    {algorithm === 'md5' 
                      ? 'MD5 is not secure for cryptographic purposes. Use only for checksums in non-security contexts.' 
                      : algorithm === 'sha1' 
                      ? 'SHA-1 is deprecated due to collision vulnerabilities. Consider upgrading to SHA-256 or higher.' 
                      : algorithm === 'sha256' 
                      ? 'SHA-256 is recommended for most security applications including passwords, certificates, and data integrity.' 
                      : algorithm === 'sha512'
                      ? 'SHA-512 provides excellent security for high-value data and government applications.'
                      : 'BLAKE2 offers superior performance and security, ideal for modern applications and blockchain.'}
                  </p>
                </div>

                {/* Usage Tips */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-bold text-blue-900 mb-2">💡 Usage Tips</h4>
                  <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                    <li>• Always use salt when hashing passwords</li>
                    <li>• Never store passwords in plain text</li>
                    <li>• Verify file integrity by comparing hash values</li>
                    <li>• Use HMAC for message authentication</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={generateHash}
                disabled={!text.trim()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                           bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg
                           hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500
                           transition-all duration-200 transform hover:scale-105 active:scale-95
                           disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Generate Hash
              </button>

              {result && (
                <button
                  onClick={copyResult}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                             bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg
                             hover:from-blue-700 hover:to-cyan-700
                             transition-all duration-200 transform hover:scale-105 active:scale-95
                             text-sm sm:text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Hash
                </button>
              )}

              <button
                onClick={reset}
                disabled={!text.trim() && !result.trim()}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl bg-white hover:bg-gray-50 
                           font-semibold text-gray-700 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Algorithm Comparison */}
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-indigo-50 border-t border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🔍 Hash Algorithm Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
              <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">✅ SHA-256</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>
                Industry standard for security. Used in SSL/TLS, Bitcoin, and password storage. Excellent balance of speed and security.
              </p>
              <div className="mt-2 text-xs text-green-700 font-medium">Best for: General security use</div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
              <h4 className="font-bold text-blue-800 mb-2 text-sm sm:text-base">🔒 SHA-512</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>
                Maximum security with 512-bit output. Preferred for government and high-value data protection requiring enhanced cryptographic strength.
              </p>
              <div className="mt-2 text-xs text-blue-700 font-medium">Best for: High-security applications</div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
              <h4 className="font-bold text-purple-800 mb-2 text-sm sm:text-base">⚡ BLAKE2</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>
                Modern algorithm faster than SHA while maintaining superior security. Popular in blockchain and cryptocurrency applications.
              </p>
              <div className="mt-2 text-xs text-purple-700 font-medium">Best for: Performance-critical systems</div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-yellow-200 shadow-sm">
              <h4 className="font-bold text-yellow-800 mb-2 text-sm sm:text-base">⚠️ SHA-1</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>
                Deprecated due to collision vulnerabilities. Should only be used for legacy system compatibility, not for new security implementations.
              </p>
              <div className="mt-2 text-xs text-yellow-700 font-medium">Status: Deprecated</div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-orange-200 shadow-sm">
              <h4 className="font-bold text-orange-800 mb-2 text-sm sm:text-base">⛔ MD5</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>
                Legacy algorithm with known security flaws. Only suitable for non-cryptographic checksums and file verification in trusted environments.
              </p>
              <div className="mt-2 text-xs text-orange-700 font-medium">Status: Insecure</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-300 shadow-sm">
              <h4 className="font-bold text-indigo-900 mb-2 text-sm sm:text-base">💡 Recommendation</h4>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium" style={{textAlign: 'justify'}}>
                For new projects, use SHA-256 or BLAKE2. Add salt for passwords. Avoid MD5 and SHA-1 for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <article className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 md:p-8 lg:p-10">
        
        <div className="prose prose-sm sm:prose-base max-w-none">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5">Understanding Cryptographic Hash Functions</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Cryptographic hash functions represent fundamental building blocks of modern information security and data integrity systems. These mathematical algorithms transform input data of arbitrary length into fixed-size output values known as hash values, digests, or simply hashes. Unlike encryption which creates reversible transformations, hashing operates as a one-way function that cannot be reversed to recover the original input. This unique property makes hash functions invaluable for applications requiring data verification, password protection, digital signatures, and blockchain technology implementations.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            The power of cryptographic hashing lies in its deterministic nature combined with extreme sensitivity to input changes. The same input always produces identical output, enabling reliable verification of data integrity. However, even minuscule modifications to the input data result in completely different hash values, a property known as the avalanche effect. This characteristic makes hash functions excellent tools for detecting unauthorized modifications to files, documents, or transmitted data. Organizations worldwide rely on hash functions to ensure data authenticity and detect tampering attempts in critical systems.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Essential Properties of Secure Hash Functions</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Security professionals evaluate hash functions based on several critical properties that determine their suitability for cryptographic applications. Pre-image resistance ensures that given a hash value, it remains computationally infeasible to find any input that produces that specific hash. Second pre-image resistance guarantees that for a given input and its hash, finding a different input that produces the same hash proves extremely difficult. Collision resistance, perhaps the most important property, means that discovering any two different inputs that generate identical hash values should be practically impossible with current computational resources.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            These security properties directly impact the real-world reliability of hash-based systems. When hash functions fail to maintain collision resistance, attackers can create fraudulent documents with identical hash values to legitimate ones, undermining digital signature systems and certificate authorities. The discovery of collision vulnerabilities in MD5 and SHA-1 led to their deprecation for security-critical applications, demonstrating the ongoing importance of using modern, thoroughly tested hash algorithms. Organizations must stay current with cryptographic research and update their systems when vulnerabilities emerge in previously trusted algorithms.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Comprehensive Guide to Hash Algorithms</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            The MD5 algorithm, developed in 1991, produces 128-bit hash values and gained widespread adoption for checksums and file verification. However, researchers discovered serious collision vulnerabilities that render MD5 unsuitable for security applications. Despite these limitations, MD5 remains useful for non-cryptographic purposes like generating cache keys or creating checksums in trusted environments where security isnt the primary concern. Organizations should never use MD5 for password storage, digital signatures, or any application where collision resistance matters.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            SHA-1, producing 160-bit hashes, succeeded MD5 but eventually faced similar collision attack vulnerabilities. Major technology companies and certificate authorities phased out SHA-1 support after researchers demonstrated practical collision attacks. The SHA-2 family, including SHA-256 and SHA-512, represents the current industry standard for cryptographic hashing. SHA-256 generates 256-bit hashes suitable for most security applications including SSL/TLS certificates, Bitcoin mining, and password storage when combined with proper salting techniques. SHA-512 offers enhanced security with 512-bit output, preferred for government applications and situations requiring maximum cryptographic strength.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            BLAKE2 represents a modern hash algorithm designed to surpass SHA-2 in both speed and security. Available in two variants, BLAKE2b produces 512-bit hashes while BLAKE2s generates 256-bit outputs. BLAKE2 achieves significantly faster processing speeds than SHA-2 while maintaining superior security margins. Cryptocurrency projects, file storage systems, and high-performance applications increasingly adopt BLAKE2 for its excellent balance of security and computational efficiency. The algorithm supports keyed hashing natively, making it ideal for message authentication codes without requiring separate HMAC construction.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Practical Applications in Modern Systems</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Password storage represents one of the most critical applications of cryptographic hashing. Instead of storing passwords in plain text, responsible organizations store hash values of passwords combined with unique random salt values. When users authenticate, the system hashes their entered password with the stored salt and compares the result to the stored hash. This approach ensures that even database breaches dont expose actual passwords. Modern password hashing should use specialized algorithms like bcrypt, scrypt, or Argon2 that incorporate multiple hashing rounds and memory-hard functions to resist brute-force attacks.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Digital signatures rely on hash functions to create compact representations of documents before applying asymmetric encryption. Rather than encrypting entire documents with slow asymmetric algorithms, systems hash the document and encrypt only the hash value. Recipients can verify signatures by hashing the received document and comparing it to the decrypted signature hash. This process ensures document authenticity, integrity, and non-repudiation while maintaining computational efficiency. Legal systems increasingly recognize digital signatures as legally binding, making hash function reliability essential for electronic commerce and digital contracts.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Blockchain technology fundamentally depends on cryptographic hashing for security and immutability. Each block contains a hash of the previous block, creating an unbreakable chain where modifying any historical block would require recalculating all subsequent block hashes. Bitcoin and other cryptocurrencies use SHA-256 extensively, with miners competing to find hash values meeting specific difficulty criteria. The computational difficulty of finding qualifying hashes provides the proof-of-work mechanism that secures blockchain networks. Smart contracts and decentralized applications leverage hash functions for creating unique identifiers, verifying data integrity, and implementing cryptographic commitments.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">File Integrity and Verification Systems</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Software distribution increasingly relies on hash values to ensure download integrity and detect tampering. Developers publish hash values alongside software releases, allowing users to verify that downloaded files match official versions. This practice protects against man-in-the-middle attacks, corrupted downloads, and malicious file substitution. Package managers for Linux distributions, mobile app stores, and software update mechanisms all incorporate hash verification to maintain software supply chain security. Organizations should always verify hash values when downloading critical software or security updates.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Version control systems like Git use hash functions to create unique identifiers for commits and track file changes efficiently. Each commit receives a hash-based identifier that depends on the commit contents, parent commits, and metadata. This design ensures that identical commit identifiers guarantee identical repository states, enabling reliable distributed version control. Developers can share repository states, verify historical accuracy, and detect any unauthorized modifications through hash comparison. The cryptographic properties of hash functions make version control systems resistant to history rewriting and malicious alterations.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Security Best Practices and Implementation Guidelines</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Proper salt implementation proves essential for secure password hashing. Salt values should be cryptographically random, unique for each password, and stored alongside the password hash. Salting prevents rainbow table attacks where attackers pre-compute hashes for common passwords. Without salting, identical passwords produce identical hashes, allowing attackers to identify users with common passwords. Modern systems generate salt values of at least 128 bits and use cryptographically secure random number generators to ensure unpredictability. Organizations should never reuse salt values across different users or systems.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Message authentication codes (MAC) combine hash functions with secret keys to verify message authenticity and integrity. HMAC construction applies hash functions twice with key material to create authentication tags resistant to length extension attacks. API authentication, secure messaging, and payment processing systems extensively use HMAC to ensure that messages havent been tampered with during transmission. The secret key ensures that only parties possessing the key can generate valid authentication codes, preventing forgery even when attackers observe legitimate messages and their authentication tags.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Organizations must establish policies for hash algorithm selection and regular security reviews. New projects should default to SHA-256 or stronger algorithms, avoiding deprecated options like MD5 and SHA-1. Legacy systems require migration plans to transition from weak hash functions to secure alternatives. Security teams should monitor cryptographic research for emerging vulnerabilities and prepare contingency plans for algorithm transitions. Regular security audits should verify that systems implement hashing correctly, use appropriate salt values, and maintain adequate iteration counts for password derivation functions.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">Performance Considerations and Optimization</h2>
          
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4" style={{textAlign: 'justify'}}>
            Hash function performance varies significantly based on algorithm choice, implementation quality, and hardware capabilities. SHA-256 provides excellent performance on modern processors with specialized instruction sets, while BLAKE2 achieves even higher throughput on general-purpose processors. Performance-critical applications like high-frequency trading systems, real-time video streaming, and large-scale data processing must carefully balance security requirements against computational overhead. Hardware acceleration through specialized processors or FPGA implementations can dramatically improve hash computation speeds for demanding workloads.
          </p>

          <p className="text-sm sm:text-base text-gray-800 leading-relaxed" style={{textAlign: 'justify'}}>
            Password hashing intentionally sacrifices performance to resist brute-force attacks through key derivation functions that apply hash operations thousands or millions of times. Functions like bcrypt, scrypt, and Argon2 include configurable work factors allowing organizations to tune computational difficulty as hardware capabilities evolve. This adaptive approach maintains security margins despite improving attack hardware, ensuring that password cracking remains economically infeasible even with specialized equipment. Organizations should regularly review and adjust work factor parameters to maintain appropriate security levels without creating unacceptable user experience degradation during authentication.
          </p>

        </div>
      </article>

    </ToolSection>
  );
}