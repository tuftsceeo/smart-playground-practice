/**
 * Tests for the command catalog (js/utils/commands.json).
 *
 * commands.json is the single source of truth for every game button:
 * its label, color, icon, and description. These tests guard the shape
 * of that data so a typo or a missing field gets caught by `npm test`
 * instead of by a blank button in the field.
 *
 * Run with: npm test
 */

const commands = require("../js/utils/commands.json");

const REQUIRED_FIELDS = ["id", "label", "bgColor", "icon", "description", "beta"];
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

describe("commands.json", () => {
  test("is a non-empty array", () => {
    expect(Array.isArray(commands)).toBe(true);
    expect(commands.length).toBeGreaterThan(0);
  });

  test("every command has all required fields", () => {
    for (const cmd of commands) {
      for (const field of REQUIRED_FIELDS) {
        expect(cmd).toHaveProperty(field);
      }
    }
  });

  test("every command id is unique", () => {
    const ids = commands.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every command label is unique", () => {
    const labels = commands.map((c) => c.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  test("every bgColor is a valid 6-digit hex color", () => {
    for (const cmd of commands) {
      expect(cmd.bgColor).toMatch(HEX_COLOR);
    }
  });

  test("every icon is a non-empty string", () => {
    for (const cmd of commands) {
      expect(typeof cmd.icon).toBe("string");
      expect(cmd.icon.length).toBeGreaterThan(0);
    }
  });
});
