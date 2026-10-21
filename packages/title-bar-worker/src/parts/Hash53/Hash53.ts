export const hash53 = (value: string, seed: number): number => {
  let hash1 = 0xde_ad_be_ef ^ seed
  let hash2 = 0x41_c6_ce_57 ^ seed
  for (const character of value) {
    const code = character.codePointAt(0)!
    hash1 = Math.imul(hash1 ^ code, 0x85_eb_ca_6b)
    hash2 = Math.imul(hash2 ^ code, 0xc2_b2_ae_35)
  }
  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 0x85_eb_ca_6b) ^ Math.imul(hash2 ^ (hash2 >>> 13), 0xc2_b2_ae_35)
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 0x85_eb_ca_6b) ^ Math.imul(hash1 ^ (hash1 >>> 13), 0xc2_b2_ae_35)
  return 4_294_967_296 * (2_097_151 & hash2) + (hash1 >>> 0)
}
